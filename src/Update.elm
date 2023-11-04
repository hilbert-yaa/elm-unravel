module Update exposing (update)

import Angle exposing (Angle)
import Axis3d
import Block3d
import Browser.Dom
import Color exposing (Color)
import Direction3d
import Event exposing (keyToEvent, rotateBlock, stampBlock, updateEvent)
import Length exposing (Length, Meters)
import Level1.Model
import Level1.Text
import Level2.Model
import Level3.Model
import Level4.Model
import Level5.Model
import Level5.Text
import Level6.Model exposing (buildStore)
import Level6.Text
import Model exposing (GameState)
import Msg exposing (Msg(..))
import Pixels exposing (Pixels)
import Point3d exposing (Point3d)
import Ports exposing (..)
import Quantity
import Scene3d
import SketchPlane3d
import Task
import Types exposing (..)
import Vector3d


noCmd : GameState -> ( GameState, Cmd msg )
noCmd model =
    ( model, Cmd.none )



-- preUpdate


update : Msg -> GameState -> ( GameState, Cmd Msg )
update msg model =
    case msg of
        Resize w h ->
            { model | screen = { width = w, height = h } } |> noCmd

        Scroll dy ->
            let
                camera =
                    model.camera

                min_dist =
                    5 |> Length.meters

                max_dist =
                    50 |> Length.meters
            in
            let
                delta_dist =
                    (if dy > 0 then
                        0.8

                     else
                        -0.8
                    )
                        |> Length.meters

                distance =
                    model.camera.distance |> Quantity.plus delta_dist |> Quantity.clamp min_dist max_dist
            in
            { model | camera = { camera | distance = distance } } |> noCmd

        Switch _ ->
            if model.gameStatus == Play then
                let
                    self =
                        model.self

                    newThis =
                        buildBlock model.goal.center

                    newSelf =
                        { self | center = model.goal.center, this = newThis }
                in
                { model | self = newSelf } |> noCmd

            else
                model |> noCmd

        Pause esc ->
            model |> updatePause esc |> noCmd

        _ ->
            updateGame msg model


updateGame : Msg -> GameState -> ( GameState, Cmd Msg )
updateGame msg model =
    case model.gameStatus of
        Paused ->
            case msg of
                Option opt ->
                    let
                        scene =
                            model.scene

                        renderOpt =
                            case opt |> String.toInt of
                                Just n ->
                                    n

                                Nothing ->
                                    5

                        newScene =
                            { scene | renderOpt = renderOpt }
                    in
                    { model | scene = newScene } |> noCmd

                _ ->
                    model |> noCmd

        PrePreGame time duration ->
            case msg of
                Tick _ ->
                    if time > duration then
                        { model | gameStatus = PreGame 0 600 } |> noCmd

                    else
                        { model | gameStatus = PrePreGame (time + 1) duration } |> noCmd

                MouseDown ->
                    { model | enableMouse = True } |> noCmd

                MouseUp ->
                    { model | enableMouse = False } |> noCmd

                MouseMove dx dy ->
                    updateElevationAzimuth dx dy model |> noCmd

                _ ->
                    model |> noCmd

        PreGame time duration ->
            case msg of
                Tick _ ->
                    if time > duration then
                        case model.level of
                            2 ->
                                ( { model | gameStatus = Play }, playSound "bgm_2" )

                            _ ->
                                ( { model | gameStatus = StartFadeIn 0 25 }
                                , Task.perform
                                    (\{ viewport } ->
                                        Resize
                                            (Pixels.int (round viewport.width))
                                            (Pixels.int (round viewport.height))
                                    )
                                    Browser.Dom.getViewport
                                )

                    else
                        { model | gameStatus = PreGame (time + 1) duration } |> noCmd

                _ ->
                    model |> noCmd

        StartFadeIn time duration ->
            case msg of
                Tick _ ->
                    if time > duration then
                        { model | gameStatus = Play } |> noCmd

                    else
                        { model | gameStatus = StartFadeIn (time + 1) duration } |> noCmd

                MouseDown ->
                    { model | enableMouse = True } |> noCmd

                MouseUp ->
                    { model | enableMouse = False } |> noCmd

                MouseMove dx dy ->
                    updateElevationAzimuth dx dy model |> noCmd

                _ ->
                    model |> noCmd

        Interlude time duration originalElevation originalDistance originalAzimuth ->
            case msg of
                Tick _ ->
                    case model.level of
                        6 ->
                            updateInterlude6 time duration originalElevation originalDistance originalAzimuth model |> noCmd

                        3 ->
                            updateInterlude3 time duration originalElevation originalDistance originalAzimuth model |> noCmd

                        4 ->
                            updateInterlude4 time duration originalElevation originalDistance originalAzimuth model

                        _ ->
                            model |> noCmd

                _ ->
                    model |> noCmd

        Animation frame ->
            case msg of
                Tick _ ->
                    case model.level of
                        0 ->
                            updateAnimation0 model |> noCmd

                        1 ->
                            updateAnimation1 model frame

                        4 ->
                            updateAnimation4 model frame |> noCmd

                        6 ->
                            updateAnimation6 model frame |> noCmd

                        _ ->
                            model |> noCmd

                MouseDown ->
                    { model | enableMouse = True } |> noCmd

                MouseUp ->
                    { model | enableMouse = False } |> noCmd

                MouseMove dx dy ->
                    updateElevationAzimuth dx dy model |> noCmd

                _ ->
                    model |> noCmd

        Lose ->
            if model.self.event /= Nothing then
                updateModelMsg model

            else
                { model | gameStatus = LoseFadeOut 15 15 } |> noCmd

        LoseFadeOut time duration ->
            case msg of
                Tick _ ->
                    if time == 0 then
                        let
                            ( originalModel, cmdMsg ) =
                                reInit model

                            restartModel =
                                { originalModel | gameStatus = StartFadeIn 0 25 }

                            restartMsg =
                                Cmd.batch
                                    [ cmdMsg
                                    , Task.perform
                                        (\{ viewport } ->
                                            Resize
                                                (Pixels.int (round viewport.width))
                                                (Pixels.int (round viewport.height))
                                        )
                                        Browser.Dom.getViewport
                                    ]
                        in
                        ( restartModel, restartMsg )

                    else
                        { model | gameStatus = LoseFadeOut (time - 1) duration } |> noCmd

                MouseDown ->
                    { model | enableMouse = True } |> noCmd

                MouseUp ->
                    { model | enableMouse = False } |> noCmd

                MouseMove dx dy ->
                    updateElevationAzimuth dx dy model |> noCmd

                _ ->
                    model |> noCmd

        LevelChange newLevel ->
            if newLevel == 2 then
                reInit { model | level = newLevel }

            else if newLevel == 0 then
                reInit { model | level = newLevel }

            else
                { model | gameStatus = WinFadeOut newLevel 40 40 } |> noCmd

        WinFadeOut newLevel time duration ->
            case msg of
                Tick _ ->
                    if time == 0 then
                        reInit { model | level = newLevel }

                    else
                        { model | gameStatus = WinFadeOut newLevel (time - 1) duration } |> noCmd

                MouseDown ->
                    { model | enableMouse = True } |> noCmd

                MouseUp ->
                    { model | enableMouse = False } |> noCmd

                MouseMove dx dy ->
                    updateElevationAzimuth dx dy model |> noCmd

                _ ->
                    model |> noCmd

        _ ->
            case msg of
                Tick _ ->
                    updateModelMsg model

                KeyDown key ->
                    case key of
                        R ->
                            checkReverse model

                        G ->
                            let
                                oldCamera =
                                    model.camera

                                godCamera =
                                    { oldCamera | distance = Length.meters 50 }

                                playerCamera =
                                    { oldCamera | distance = playerCameraDistance }
                            in
                            if model.godMode then
                                { model | godMode = False, enableKey = False, camera = playerCamera } |> updateFocalPoint |> noCmd

                            else
                                { model | godMode = True, enableKey = False, camera = godCamera } |> noCmd

                        _ ->
                            -- ↑↓←→WASD
                            let
                                newKey =
                                    updateKey key model
                            in
                            { model | enableKey = False } |> updateWhenMove newKey |> noCmd

                KeyUp ->
                    { model | enableKey = True } |> noCmd

                MouseDown ->
                    { model | enableMouse = True } |> noCmd

                MouseUp ->
                    { model | enableMouse = False } |> noCmd

                MouseMove dx dy ->
                    updateElevationAzimuth dx dy model |> noCmd

                _ ->
                    model |> noCmd



{- update when pressing WASD -}


updateWhenMove : Direction -> GameState -> GameState
updateWhenMove key model =
    if model.playerRound && ifNextStepAvailable model.self key model then
        model
            |> examLoseAndWarn key
            |> updateKeyEvent key
            |> examTextFall key

    else
        model


updateModelMsg : GameState -> ( GameState, Cmd Msg )
updateModelMsg model =
    let
        point =
            Point3d.toRecord Length.inMeters model.self.center

        goal =
            case model.level of
                0 ->
                    Point3d.meters 1 1 1

                _ ->
                    model.goal.center

        checkGoal =
            if model.self.center == goal then
                True

            else if model.level == 3 && (point.y >= 18 || point.y <= -18) then
                True

            else
                False

        newStatus =
            if checkGoal then
                case model.level of
                    0 ->
                        Animation 1

                    1 ->
                        Animation 1

                    3 ->
                        LevelChange 5

                    4 ->
                        Interlude 0 1000 model.camera.elevation model.camera.distance model.camera.azimuth

                    5 ->
                        LevelChange 4

                    6 ->
                        Animation 1

                    _ ->
                        LevelChange (switchLevel model.level)

            else
                model.gameStatus

        cmdMsg =
            if checkGoal then
                case model.level of
                    0 ->
                        playSound "reverse_long"

                    _ ->
                        Cmd.none

            else
                Cmd.none
    in
    case model.level of
        5 ->
            ( { model | gameStatus = newStatus, time = model.time + 1 }
                |> updateBlocks
                |> updateGEvents
                |> updateFocalPoint
                |> updateText
                |> updateTexts3d
                |> updateBackground
                |> updateLevel5
            , cmdMsg
            )

        _ ->
            ( { model | gameStatus = newStatus, time = model.time + 1 }
                |> updateBlocks
                |> updateGEvents
                |> updateFocalPoint
                |> updateText
                |> updateCars 0.1
                |> updateTexts3d
                |> updateText3dStart
                |> updateBackground
                |> updateLevel0Text
                |> updateLevel3Text
                |> updateWarning
                |> updateLevel6
            , cmdMsg
            )



----------level 6----------


updateLevel6 : GameState -> GameState
updateLevel6 model =
    if model.level /= 6 then
        model

    else
        model
            |> updateLock



-- |> updateCamera6


updateLock : GameState -> GameState
updateLock model =
    let
        selfY =
            Quantity.ratio (model.self.this |> Block3d.centerPoint |> Point3d.yCoordinate) (Length.meters 1)

        newSettings =
            let
                lamps =
                    [ lamp (Point3d.meters -8 -20 0) 0
                    , lamp (Point3d.meters -8 0 0) 0
                    , lamp (Point3d.meters -8 20 0) 0
                    , lamp (Point3d.meters 8 -20 0) 180
                    , lamp (Point3d.meters 8 0 0) 180
                    , lamp (Point3d.meters 8 20 0) 180
                    , lamp (Point3d.meters 8 -40 0) 180
                    , lamp (Point3d.meters -8 -40 0) 0
                    , lamp (Point3d.meters 8 -60 0) 180
                    , lamp (Point3d.meters -8 -60 0) 0
                    , lamp (Point3d.meters 6 -100 0) 180
                    ]

                store =
                    buildStore (Point 0 40 0)

                text1 =
                    text3d "store" (Point3d.meters -3.5 33.3 5) 0.25 { a = 270, b = 0, c = 0 }

                -- shade = [
                --     Scene3d.quad (Material.color Color.black) (Point3d.meters 0.1 -7.01 4) (Point3d.meters 0.1 -7.01 5.2) (Point3d.meters -0.1 -7.01 5.2) (Point3d.meters -0.1 -7.01 4)
                --     , Scene3d.block (Material.color Color.black) (Block3d.from (Point3d.meters 1 -7.5 4) (Point3d.meters -1 -7.01 5.2))
                --     , Scene3d.quad (Material.color Color.black) (Point3d.meters 0.1 -7.1 4.8) (Point3d.meters 0.1 -7.1 5.2) (Point3d.meters -0.1 -7.1 5.2) (Point3d.meters -0.1 -7.1 4.8)
                --     , Scene3d.quad (Material.color Color.black) (Point3d.meters 0.1 -7.1 4.8) (Point3d.meters 0.1 -7.1 5.2) (Point3d.meters -0.1 -7.1 5.2) (Point3d.meters -0.1 -7.1 4.8)
                --     ]
            in
            Scene3d.group <|
                store
                    ++ lamps
                    ++ [ text1 ]

        --++shade
    in
    if selfY == -99 && model.level6Lock then
        { model | level6Lock = False, gameStatus = Interlude 0 300 model.camera.elevation model.camera.distance model.camera.azimuth, settings = newSettings }

    else
        model


updateInterlude6 : Float -> Float -> Angle -> Length -> Angle -> GameState -> GameState
updateInterlude6 time duration originalElevation originalDistance originalAzimuth model =
    let
        ratio =
            1

        targetElevation =
            Angle.degrees 10

        targetDistance =
            Length.meters 20

        tartgetAzimuth =
            Angle.degrees -90

        ( newElevation, newDistance, newAzimuth ) =
            ( targetElevation |> Quantity.minus originalElevation |> Quantity.multiplyBy ((sin (time / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalElevation
            , targetDistance |> Quantity.minus originalDistance |> Quantity.multiplyBy ((sin (time / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalDistance
            , tartgetAzimuth |> Quantity.minus originalAzimuth |> Quantity.multiplyBy ((sin (time / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalAzimuth
            )

        oldCamera =
            model.camera

        newCamera =
            { oldCamera | elevation = newElevation, distance = newDistance, azimuth = newAzimuth }

        newGameStatus =
            if time >= duration then
                Play

            else
                Interlude (time + 1) duration originalElevation originalDistance originalAzimuth
    in
    { model | camera = newCamera, gameStatus = newGameStatus }



----------level 6----------
-----------------level 5 update-----------------


updateLevel5 : GameState -> GameState
updateLevel5 model =
    model
        |> updateLevel5onTime


updateLevel5onTime : GameState -> GameState
updateLevel5onTime model =
    let
        self =
            model.self

        ifMeet =
            List.any (\block -> examDistance block self (Length.meters 2.2) (Length.meters 1.9)) model.actives

        newColor =
            if model.world == Reversed && ifMeet then
                self.color
                    |> level5ChangeColor 5

            else
                self.color
                    |> level5ChangeColor -1

        ifEnd =
            0.001 > (.alpha <| Color.toRgba <| newColor)

        newSelf =
            { self | color = newColor }
    in
    if model.level == 5 then
        if ifEnd then
            { model | gameStatus = Lose }

        else
            { model | self = newSelf }

    else
        model


level5ChangeColor : Float -> Color -> Color
level5ChangeColor rate color =
    let
        stamp : Float -> Float
        stamp x =
            if 0 <= x && x <= 1 then
                x

            else if x < 0 then
                0

            else
                1
    in
    color
        |> Color.toRgba
        |> (\c -> { c | red = c.red + 0.004 * rate, green = c.green + 0.004 * rate, blue = c.blue + 0.0008 * rate, alpha = c.alpha + 0.004 * rate })
        |> (\c -> { c | red = stamp c.red, green = stamp c.green, blue = stamp c.blue, alpha = stamp c.alpha })
        |> Color.fromRgba



-----------------level 5 update-----------------
-----------------level 0 text-----------------


updateLevel0Text : GameState -> GameState
updateLevel0Text model =
    let
        t =
            model.time

        text1 =
            { content = "Press WASD to move.", top = 10, left = 46, opacity = 0, size = 0.7, event = { name = Types.Noop, init = 0, duration = 200 } }

        text2 =
            { content = "Press ESC to setup menu.", top = 10, left = 46, opacity = 0, size = 0.7, event = { name = Types.Noop, init = 0, duration = 200 } }
    in
    if (t == 150 || t == 1000) && (model.self.center == Point3d.meters -1 -1 1) && model.level == 0 then
        makeText model text1

    else if t == 500 && model.level == 0 then
        makeText model text2

    else
        model



-----------------level 0 text-----------------
-----------------level 3 text-----------------


updateLevel3Text : GameState -> GameState
updateLevel3Text model =
    let
        t =
            model.time

        text1 =
            { content = "Try to 'r'everse your mind.", top = 10, left = 45, opacity = 0, size = 0.7, event = { name = Types.Noop, init = 0, duration = 400 } }

        text2 =
            { content = "Try to 'r'everse your inner world.", top = 10, left = 44, opacity = 0, size = 0.7, event = { name = Types.Noop, init = 0, duration = 400 } }

        text3 =
            { content = "Press R to reverse your mind.", top = 10, left = 45, opacity = 0, size = 0.7, event = { name = Types.Noop, init = 0, duration = 400 } }
    in
    if t == 700 && model.level3Lock <= 3 && model.level3Lock >= 0 && model.level == 3 then
        makeText model text1

    else if t == 2000 && model.level3Lock <= 3 && model.level3Lock >= 0 && model.level == 3 then
        makeText model text2

    else if t == 5000 && model.level3Lock <= 3 && model.level3Lock >= 0 && model.level == 3 then
        makeText model text3

    else if (t == 500 || t == 1500) && model.level3Lock > 3 && model.level == 3 then
        makeText model text3

    else
        model



-----------------level 3 text-----------------
-----------------level2.textfall----------


updateBackground : GameState -> GameState
updateBackground model =
    let
        scene =
            model.scene

        colorNumber =
            1 - toFloat model.time / 1500

        newBackground =
            Color.rgb colorNumber colorNumber colorNumber

        newScene =
            { scene | background = newBackground }
    in
    if model.level == 2 then
        { model | scene = newScene }

    else
        model


updateText3dStart : GameState -> GameState
updateText3dStart model =
    let
        dirSelf =
            case model.self.event of
                Nothing ->
                    R

                Just selfEvent ->
                    case selfEvent.name of
                        Rotate dir ->
                            dir

                        _ ->
                            R

        preSelf =
            stampBlock dirSelf model.self

        period =
            if model.self.event == Nothing then
                50

            else
                100

        preModel =
            { model | self = preSelf }

        ( _, texts ) =
            if modBy period model.time == 0 then
                List.foldl findFallText ( preModel, [] ) preModel.texts3d

            else
                ( preModel, preModel.texts3d )

        newGameStatus =
            if texts == preModel.texts3d && modBy period model.time == 0 then
                Lose

            else if model.time == 1500 then
                LevelChange 3

            else
                model.gameStatus
    in
    if model.level == 2 then
        { model | texts3d = texts, gameStatus = newGameStatus }

    else
        model



-----------------level2.textfall----------


updateTexts3d : GameState -> GameState
updateTexts3d model =
    let
        ( newTexts3d, newTexts3dRev ) =
            case model.level of
                0 ->
                    ( List.map (updateText3dPosition 60) model.texts3d
                    , List.map (updateText3dPosition 60) model.texts3dRev
                    )

                2 ->
                    ( List.map (updateText3dPosition 40) model.texts3d
                    , List.map (updateText3dPosition 40) model.texts3dRev
                    )

                3 ->
                    case model.gameStatus of
                        Interlude _ _ _ _ _ ->
                            ( List.map (updateText3dPositionAdvanced 200) model.texts3d
                            , List.map (updateText3dPositionAdvanced 200) model.texts3dRev
                            )

                        _ ->
                            ( List.map (updateText3dPositionAdvanced 40) model.texts3d
                            , List.map (updateText3dPositionAdvanced 40) model.texts3dRev
                            )

                4 ->
                    case model.gameStatus of
                        Interlude _ _ _ _ _ ->
                            ( List.map (updateText3dPosition 100) model.texts3d
                            , List.map (updateText3dPosition 100) model.texts3dRev
                            )

                        _ ->
                            ( List.map (updateText3dPositionAdvanced 40) model.texts3d
                            , List.map (updateText3dPositionAdvanced 40) model.texts3dRev
                            )

                6 ->
                    if model.level6Lock then
                        ( List.map (updateText3dPositionAdvancedRot 100) model.texts3d
                        , List.map (updateText3dPositionAdvancedRot 100) model.texts3dRev
                        )

                    else
                        ( List.map (updateText3dPositionAdvanced 40) model.texts3d
                        , List.map (updateText3dPositionAdvanced 40) model.texts3dRev
                        )

                _ ->
                    ( List.map (updateText3dPositionAdvanced 40) model.texts3d
                    , List.map (updateText3dPositionAdvanced 40) model.texts3dRev
                    )
    in
    { model | texts3d = newTexts3d, texts3dRev = newTexts3dRev }


updateText3dPosition : Float -> Text3d -> Text3d
updateText3dPosition duration text3d =
    if text3d.time < 0 || text3d.time >= duration then
        text3d

    else
        let
            h =
                2

            z =
                h * (1 - sqrt (sin (text3d.time / duration * pi / 2)))

            newAnchor =
                text3d.anchor |> Point3d.translateIn Direction3d.z (Length.meters z)

            entities =
                Types.text3d text3d.str newAnchor text3d.scale { a = text3d.rot, b = 0, c = 0 }

            newEntities =
                Scene3d.translateIn Direction3d.positiveZ (Length.meters z) entities
        in
        { text3d | time = text3d.time + 1, entities = newEntities }


updateText3dPositionRot : Float -> Text3d -> Text3d
updateText3dPositionRot duration text3d =
    if text3d.time < 0 || text3d.time >= duration then
        text3d

    else
        let
            h =
                2

            z =
                h * (1 - sqrt (sin (text3d.time / duration * pi / 2)))

            newAnchor =
                text3d.anchor |> Point3d.translateIn Direction3d.z (Length.meters z)

            entities =
                Types.text3d text3d.str newAnchor text3d.scale { a = text3d.rot, b = 0, c = -90 }

            newEntities =
                Scene3d.translateIn Direction3d.positiveZ (Length.meters z) entities
        in
        { text3d | time = text3d.time + 1, entities = newEntities }


updateText3dPositionAdvanced : Float -> Text3d -> Text3d
updateText3dPositionAdvanced duration text3d =
    if text3d.time < 0 then
        text3d

    else if text3d.time > duration && text3d.time < 9 * duration then
        { text3d | time = text3d.time + 1 }

    else if text3d.time >= 0 && text3d.time <= duration then
        let
            h =
                2

            z =
                h * (1 - sqrt (sin (text3d.time / duration * pi / 2)))

            newAnchor =
                text3d.anchor |> Point3d.translateIn Direction3d.z (Length.meters z)

            entities =
                Types.text3d text3d.str newAnchor text3d.scale { a = text3d.rot, b = 0, c = 0 }

            newEntities =
                Scene3d.translateIn Direction3d.positiveZ (Length.meters z) entities
        in
        { text3d | time = text3d.time + 1, entities = newEntities }

    else if text3d.time > 10 * duration then
        { text3d | time = -1 }

    else
        let
            h =
                2

            newTime =
                10 * duration - text3d.time

            z =
                h * (1 - sqrt (sin (newTime / duration * pi / 2)))

            newAnchor =
                text3d.anchor |> Point3d.translateIn Direction3d.z (Length.meters z)

            entities =
                Types.text3d text3d.str newAnchor text3d.scale { a = text3d.rot, b = 0, c = 0 }

            newEntities =
                Scene3d.translateIn Direction3d.positiveZ (Length.meters z) entities
        in
        { text3d | time = text3d.time + 1, entities = newEntities }


updateText3dPositionAdvancedRot : Float -> Text3d -> Text3d
updateText3dPositionAdvancedRot duration text3d =
    if text3d.time < 0 then
        text3d

    else if text3d.time > duration && text3d.time < 9 * duration then
        { text3d | time = text3d.time + 1 }

    else if text3d.time >= 0 && text3d.time <= duration then
        let
            h =
                2

            z =
                h * (1 - sqrt (sin (text3d.time / duration * pi / 2)))

            newAnchor =
                text3d.anchor |> Point3d.translateIn Direction3d.z (Length.meters z)

            entities =
                Types.text3d text3d.str newAnchor text3d.scale { a = text3d.rot, b = 0, c = -90 }

            newEntities =
                Scene3d.translateIn Direction3d.positiveZ (Length.meters z) entities
        in
        { text3d | time = text3d.time + 1, entities = newEntities }

    else if text3d.time > 10 * duration then
        { text3d | time = -1 }

    else
        let
            h =
                2

            newTime =
                10 * duration - text3d.time

            z =
                h * (1 - sqrt (sin (newTime / duration * pi / 2)))

            newAnchor =
                text3d.anchor |> Point3d.translateIn Direction3d.z (Length.meters z)

            entities =
                Types.text3d text3d.str newAnchor text3d.scale { a = text3d.rot, b = 0, c = -90 }

            newEntities =
                Scene3d.translateIn Direction3d.positiveZ (Length.meters z) entities
        in
        { text3d | time = text3d.time + 1, entities = newEntities }


updateKeyEvent : Direction -> GameState -> GameState
updateKeyEvent key model =
    { model | self = keyToEvent key model.time model.self }


examTextFall : Direction -> GameState -> GameState
examTextFall key model =
    case model.level of
        2 ->
            model

        6 ->
            let
                preSelf =
                    stampBlock key model.self

                preModel =
                    { model | self = preSelf }

                ( _, texts ) =
                    List.foldl editTextHelper6 ( preModel, [] ) preModel.texts3d

                ( _, textsRev ) =
                    List.foldl editTextHelper6 ( preModel, [] ) preModel.texts3dRev
            in
            { model | texts3d = texts, texts3dRev = textsRev }

        _ ->
            let
                preSelf =
                    stampBlock key model.self

                preModel =
                    { model | self = preSelf }

                ( _, texts ) =
                    List.foldl editTextHelper ( preModel, [] ) preModel.texts3d

                ( _, textsRev ) =
                    List.foldl editTextHelper ( preModel, [] ) preModel.texts3dRev
            in
            { model | texts3d = texts, texts3dRev = textsRev }


editTextHelper : Text3d -> ( GameState, List Text3d ) -> ( GameState, List Text3d )
editTextHelper text3d ( model, list ) =
    if text3d.time == -1 && List.any (\block -> examDistance block model.self (Length.meters 2.2) (Length.meters 1.9)) text3d.wall then
        ( model, list ++ [ { text3d | time = 0 } ] )

    else
        ( model, list ++ [ text3d ] )


editTextHelper6 : Text3d -> ( GameState, List Text3d ) -> ( GameState, List Text3d )
editTextHelper6 text3d ( model, list ) =
    if text3d.time == -1 && List.any (\block -> examDistance block model.self (Length.meters 10) (Length.meters 1.9)) text3d.wall then
        ( model, list ++ [ { text3d | time = 0 } ] )

    else
        ( model, list ++ [ text3d ] )


checkReverse : GameState -> ( GameState, Cmd Msg )
checkReverse model =
    if (model.level >= 3 || model.level == 0) && (model.level3Lock == -1) && model.level <= 5 && model.event == Nothing && ifNextStepAvailable model.self R model && (model.reverseTimer + 60) <= model.time then
        ( { model
            | enableKey = False
            , event = Nothing
            , world =
                if model.world == Normal then
                    Reversed

                else
                    Normal
            , reverseTimer = model.time
          }
        , playSound "reverse"
        )

    else if model.level == 3 && model.level3Lock >= 0 then
        ( { model
            | enableKey = False
            , event = Nothing
            , reverseTimer = model.time
            , gameStatus = Interlude 0 1200 model.camera.elevation model.camera.distance model.camera.azimuth
          }
        , playSound "reverse_long"
        )

    else
        { model | enableKey = False } |> noCmd


findFallText : Text3d -> ( GameState, List Text3d ) -> ( GameState, List Text3d )
findFallText text3d ( model, list ) =
    if
        text3d.time
            == -2
            && List.any (\block -> examDistance block model.self (Length.meters 4.1) (Length.meters 1.9)) text3d.wall
            && List.all (\block -> not (examDistance block model.self (Length.meters 1.5) (Length.meters 0))) text3d.wall
            && not (List.any (\text -> text.time == 0) list)
    then
        ( model, list ++ [ { text3d | time = 0 } ] )

    else
        ( model, list ++ [ text3d ] )


updateFrame : Int -> GameState -> GameState
updateFrame frame model =
    let
        newFrameTime =
            if model.frameTime /= 0 then
                model.frameTime - 1

            else
                0

        newStatus =
            if newFrameTime == 1 then
                if model.level == 1 then
                    if frame == 5 then
                        LevelChange 2

                    else
                        Animation (frame + 1)

                else if model.level == 6 then
                    if frame == 12 then
                        LevelChange 0

                    else
                        Animation (frame + 1)

                else
                    case model.level of
                        4 ->
                            LevelChange 5

                        _ ->
                            Play

            else
                model.gameStatus
    in
    { model | frameTime = newFrameTime, gameStatus = newStatus }


updateAnimation6 : GameState -> Int -> GameState
updateAnimation6 model frame =
    let
        newTime =
            model.time + 1

        newFrameTime =
            if model.frameTime == 0 then
                80

            else
                model.frameTime

        text1 =
            { content = "Hi.", top = 20, left = 45, opacity = 0, size = 1.5, event = { name = Types.Noop, init = 0, duration = 200 } }

        text2 =
            { content = "Have we met in the dream?", top = 50, left = 46, opacity = 0, size = 0.7, event = { name = Types.Noop, init = 0, duration = 300 } }
    in
    let
        newModel =
            if frame == 2 then
                makeText model text1

            else if frame == 7 then
                makeText model text2

            else
                model
    in
    { newModel | time = newTime, frameTime = newFrameTime } |> updateFrame frame |> updateText



---------- Level1 Animation ----------


updateAnimation1 : GameState -> Int -> ( GameState, Cmd Msg )
updateAnimation1 model frame =
    let
        newTime =
            model.time + 1

        newFrameTime =
            if model.frameTime == 0 then
                80

            else
                model.frameTime

        distance =
            model.camera.distance |> Quantity.plus (Length.meters 25)

        ( newMsg, newDistance ) =
            if model.frameTime == 0 then
                case frame of
                    1 ->
                        ( playSound "reverse_1", model.camera.distance )

                    2 ->
                        ( playSound "reverse_2", distance )

                    3 ->
                        ( playSound "reverse_3", distance )

                    4 ->
                        ( playSound "reverse_4", distance )

                    5 ->
                        ( playSound "reverse_5", distance )

                    _ ->
                        ( Cmd.none, model.camera.distance )

            else
                ( Cmd.none, model.camera.distance )

        oldCamera =
            model.camera

        newCamera =
            { oldCamera | distance = newDistance }

        newModel =
            case frame of
                1 ->
                    { model | frameTime = newFrameTime } |> updateBlocks |> updateFrame frame |> updateText

                2 ->
                    { model | frameTime = newFrameTime } |> updateBlocks |> updateFrame frame |> updateText

                3 ->
                    { model | frameTime = newFrameTime } |> updateBlocks |> updateFrame frame |> updateText

                4 ->
                    { model | frameTime = newFrameTime } |> updateBlocks |> updateFrame frame |> updateText

                5 ->
                    { model | frameTime = newFrameTime } |> updateBlocks |> updateFrame frame |> updateText

                _ ->
                    model
    in
    ( { newModel | time = newTime, camera = newCamera }, newMsg )



---------- Level4 Animation ----------


updateAnimation4 : GameState -> Int -> GameState
updateAnimation4 model frame =
    let
        newTime =
            model.time + 1

        newFrameTime =
            if model.frameTime == 0 then
                80

            else
                model.frameTime

        text =
            { content = "I finally tell you.", top = 20, left = 45, opacity = 0, size = 2, event = { name = Types.Noop, init = 0, duration = 200 } }
    in
    let
        newModel =
            if model.frameTime == 0 then
                makeText model text

            else
                model
    in
    { newModel | time = newTime, frameTime = newFrameTime } |> updateFrame frame |> updateText



---------- Level4 Animation ----------
---------- Start page ----------


updateAnimation0 : GameState -> GameState
updateAnimation0 model =
    let
        newFrameTime =
            model.frameTime - 4
    in
    if newFrameTime < 0 then
        { model | gameStatus = LevelChange 1 }

    else
        { model | frameTime = newFrameTime }



---------- Start page ----------


updateFocalPoint : GameState -> GameState
updateFocalPoint model =
    if model.godMode then
        model

    else if model.level == 0 then
        let
            oldCamera =
                model.camera

            x =
                modBy 360 model.time |> toFloat

            oldCoordinate =
                Point3d.meters 2 0 1

            vector =
                Vector3d.rThetaOn SketchPlane3d.xy
                    (Length.meters 0.5)
                    (Angle.degrees x)

            newCoordinate =
                Point3d.translateBy vector oldCoordinate

            newCamera =
                { oldCamera | focalPoint = newCoordinate }
        in
        { model | camera = newCamera }

    else
        let
            oldCamera =
                model.camera

            selfCoordinate =
                Block3d.centerPoint model.self.this

            newCoordinate =
                Point3d.xyz (Point3d.xCoordinate selfCoordinate) (Point3d.yCoordinate selfCoordinate) (Length.meters 1)

            newCamera =
                { oldCamera | focalPoint = newCoordinate }
        in
        { model | camera = newCamera }



----------level1 warning----------


updateWarning : GameState -> GameState
updateWarning model =
    case model.level of
        1 ->
            let
                oldCamera =
                    model.camera

                threshold =
                    Length.meters 6

                distance =
                    Quantity.minimum (List.map (\block -> blockDistance model.self block) model.actives) |> Maybe.withDefault (Length.meters 0)

                ( r, rgb ) =
                    if Quantity.lessThan threshold distance then
                        ( distance |> Quantity.negate |> Quantity.plus threshold |> Quantity.divideBy 60
                        , Color.rgb
                            ((3 - Quantity.ratio distance threshold) * (Color.toRgba originalColor).green)
                            (Color.toRgba originalColor).green
                            (Color.toRgba originalColor).blue
                        )

                    else
                        ( Length.meters 0, Color.rgb255 10 10 10 )

                f =
                    5

                x =
                    360 / f * toFloat (modBy f model.time)

                vector =
                    Vector3d.rThetaOn SketchPlane3d.xy
                        r
                        (Angle.degrees x)

                newCoordinate =
                    Point3d.translateBy vector oldCamera.focalPoint

                newCamera =
                    { oldCamera | focalPoint = newCoordinate }

                originalColor =
                    model.scene.background

                originalScene =
                    model.scene

                newScene =
                    { originalScene | background = rgb }
            in
            { model | camera = newCamera, scene = newScene }

        2 ->
            let
                oldCamera =
                    model.camera

                threshold =
                    Length.meters 6

                distance =
                    Quantity.minimum (List.map (\block -> blockDistance model.self block) model.actives) |> Maybe.withDefault (Length.meters 0)

                ( r, _ ) =
                    if Quantity.lessThan threshold distance then
                        ( Length.meters (toFloat model.time * 0.05 / 1500)
                        , Color.rgb
                            ((3 - Quantity.ratio distance threshold) * (Color.toRgba originalColor).green)
                            (Color.toRgba originalColor).green
                            (Color.toRgba originalColor).blue
                        )

                    else
                        ( Length.meters 0, Color.rgb255 10 10 10 )

                f =
                    5

                x =
                    360 / f * toFloat (modBy f model.time)

                vector =
                    Vector3d.rThetaOn SketchPlane3d.xy
                        r
                        (Angle.degrees x)

                newCoordinate =
                    Point3d.translateBy vector oldCamera.focalPoint

                newCamera =
                    { oldCamera | focalPoint = newCoordinate }

                originalColor =
                    model.scene.background
            in
            { model | camera = newCamera }

        _ ->
            model



----------level1 warning----------


blockDistance : Block -> Block -> Quantity.Quantity Float Meters
blockDistance block1 block2 =
    Point3d.distanceFrom (Block3d.centerPoint block1.this) (Block3d.centerPoint block2.this)


updateElevationAzimuth : Quantity.Quantity Float Pixels -> Quantity.Quantity Float Pixels -> GameState -> GameState
updateElevationAzimuth dx dy model =
    let
        camRate =
            Angle.degrees 0.75 |> Quantity.per Pixels.pixel

        newAzimuth =
            model.camera.azimuth
                |> Quantity.minus (dx |> Quantity.at camRate)

        newElevation =
            model.camera.elevation
                |> Quantity.plus (dy |> Quantity.at camRate)
                |> (if model.godMode then
                        Quantity.clamp (Angle.degrees 0) (Angle.degrees 90)

                    else if model.level6Lock then
                        Quantity.clamp (Angle.degrees 90) (Angle.degrees 90)

                    else if model.level == 3 then
                        Quantity.clamp (Angle.degrees 22) (Angle.degrees 40)

                    else
                        Quantity.clamp (Angle.degrees 10) (Angle.degrees 40)
                   )

        camera =
            model.camera

        newCamera =
            { camera | elevation = newElevation, azimuth = newAzimuth }
    in
    if model.level == 0 then
        model

    else
        { model | camera = newCamera }



{- update key according to camera -}


updateKey : Direction -> GameState -> Direction
updateKey key model =
    let
        azimuth =
            model.camera.azimuth

        sin =
            Angle.sin azimuth

        cos =
            Angle.cos azimuth

        switch =
            if cos > 0.707 then
                0

            else if sin > 0 && cos > -0.707 then
                1

            else if cos < -0.707 then
                2

            else
                3

        original =
            case key of
                Up ->
                    0

                Left ->
                    1

                Down ->
                    2

                Right ->
                    3

                _ ->
                    1

        after =
            modBy 4 (switch + original)
    in
    case after of
        0 ->
            Up

        1 ->
            Left

        2 ->
            Down

        _ ->
            Right



{- update active blocks -}


updateActives : GameState -> GameState
updateActives model =
    let
        updateActiveBlocks =
            \list -> List.map (\block -> updateActiveBlock model block) list

        switchRound =
            not <| List.any (\block -> not (block.event == Nothing)) model.actives

        actives =
            updateActiveBlocks model.actives

        activeModel =
            if model.level == 6 && model.level6Lock == False then
                { model | actives = actives, playerRound = switchRound }

            else if model.level == 6 && model.level6Lock == True then
                model

            else
                { model | actives = actives, playerRound = switchRound }

        newModel =
            examLoseAndWarn R activeModel
    in
    { newModel | text = model.text }


updateBlocks : GameState -> GameState
updateBlocks model =
    let
        newSelf =
            updateBlock model model.self

        switchRound =
            if model.gameStatus == Play then
                if not (newSelf.center == model.self.center) then
                    False

                else
                    True

            else if model.frameTime /= 80 then
                True

            else
                False
    in
    { model | self = newSelf, playerRound = switchRound }
        |> updateActives



--------------car--------------


updateCars : Float -> GameState -> GameState
updateCars speed model =
    let
        cars1 =
            List.filter (\car -> (Point3d.toMeters car.center).y == -15) model.cars

        cars2 =
            List.filter (\car -> (Point3d.toMeters car.center).y == -9) model.cars

        cars3 =
            List.filter (\car -> (Point3d.toMeters car.center).y == 9) model.cars

        cars4 =
            List.filter (\car -> (Point3d.toMeters car.center).y == 15) model.cars

        newCars1 =
            updateCarsInLine cars1 model (Point3d.meters -11 -15 1) (Point3d.meters 11 -15 1) Down speed

        newCars2 =
            updateCarsInLine cars2 model (Point3d.meters 11 -9 1) (Point3d.meters -11 -9 1) Up speed

        newCars3 =
            updateCarsInLine cars3 model (Point3d.meters -11 9 1) (Point3d.meters 11 9 1) Down speed

        newCars4 =
            updateCarsInLine cars4 model (Point3d.meters 11 15 1) (Point3d.meters -11 15 1) Up speed

        cars =
            newCars1 ++ newCars2 ++ newCars3 ++ newCars4

        ( newStatus, newLock ) =
            if List.any (\block -> examDistance block model.self (Length.meters 1.99) (Length.meters 0)) cars && model.world == Normal then
                ( Lose, model.level3Lock + 1 )

            else
                ( model.gameStatus, model.level3Lock )
    in
    if model.level == 3 then
        { model | cars = cars, gameStatus = newStatus, level3Lock = newLock }

    else
        model


updateCarsInLine : List Block -> GameState -> Point3d Meters WorldCoordinates -> Point3d Meters WorldCoordinates -> Direction -> Float -> List Block
updateCarsInLine cars model begin end dir speed =
    let
        createdCars =
            createCars cars model.time model.carPeriod dir begin

        movedCars =
            moveCars createdCars speed model

        horizontalAxis =
            case dir of
                Up ->
                    Axis3d.withDirection Direction3d.negativeX end

                Down ->
                    Axis3d.withDirection Direction3d.positiveX end

                Left ->
                    Axis3d.withDirection Direction3d.negativeY end

                _ ->
                    Axis3d.withDirection Direction3d.positiveY end

        endRange =
            Point3d.along horizontalAxis (Length.meters speed)

        deletedCars =
            case dir of
                Up ->
                    deleteCars movedCars endRange end

                Down ->
                    deleteCars movedCars end endRange

                Left ->
                    deleteCars movedCars endRange end

                _ ->
                    deleteCars movedCars end endRange

        newCars =
            transformCars deletedCars model.wall
    in
    newCars


createCars : List Block -> Int -> Int -> Direction -> Point3d Meters WorldCoordinates -> List Block
createCars cars time period dir point =
    let
        event =
            Event (Drive dir) time 0

        newCar =
            buildColorBlock point Color.lightRed (Just event) Up

        newCars =
            if modBy period time == 1 && List.length cars <= 3 && not (List.any (\car -> examDistance car newCar (Length.meters 2) (Length.meters 0)) cars) then
                cars ++ [ newCar ]

            else
                cars
    in
    newCars


transformCars : List Block -> List Block -> List Block
transformCars cars walls =
    List.map (\car -> transformCar car walls) cars


transformCar : Block -> List Block -> Block
transformCar car walls =
    let
        wallNear =
            List.filter (\block -> examDistance block car (Length.meters 2) (Length.meters 0)) walls

        wall =
            Maybe.withDefault car (List.head wallNear)

        distance =
            Point3d.distanceFrom wall.center car.center

        ( x1, _, _ ) =
            Point3d.toTuple Length.inInches wall.center

        ( x, _, _ ) =
            Point3d.toTuple Length.inInches car.center

        moveVector =
            if x1 < x then
                Vector3d.xyz (Length.meters 2 |> Quantity.minus distance) (Length.meters 0) (Length.meters 0)

            else
                Vector3d.xyz (distance |> Quantity.minus (Length.meters 2)) (Length.meters 0) (Length.meters 0)

        comp =
            Quantity.half (Length.meters 2)

        vec =
            Vector3d.xyz comp comp comp

        v1 =
            if x1 >= x then
                car.center |> Point3d.translateBy vec |> Point3d.translateBy moveVector

            else
                car.center |> Point3d.translateBy vec

        v2 =
            if x1 < x then
                car.center |> Point3d.translateBy (Vector3d.reverse vec) |> Point3d.translateBy moveVector

            else
                car.center |> Point3d.translateBy (Vector3d.reverse vec)
    in
    if Quantity.lessThan (Length.meters 2) distance && Quantity.greaterThan (Length.meters 0) distance then
        Block (Block3d.from v1 v2) car.center car.color car.event car.dirBefore

    else
        car


deleteCars : List Block -> Point3d Meters WorldCoordinates -> Point3d Meters WorldCoordinates -> List Block
deleteCars cars point1 point2 =
    List.filter (\car -> deleteCar car point1 point2) cars


deleteCar : Block -> Point3d Meters WorldCoordinates -> Point3d Meters WorldCoordinates -> Bool
deleteCar car point1 point2 =
    let
        ( x1, y1, _ ) =
            Point3d.toTuple Length.inInches point1

        ( x2, y2, _ ) =
            Point3d.toTuple Length.inInches point2

        ( x, y, _ ) =
            Point3d.toTuple Length.inInches car.center
    in
    not (x >= x1 && x <= x2 && y >= y1 && y <= y2)


moveCars : List Block -> Float -> GameState -> List Block
moveCars cars speed model =
    List.map (\car -> moveCar car cars speed model) cars


moveCar : Block -> List Block -> Float -> GameState -> Block
moveCar car cars speed model =
    let
        event =
            Maybe.withDefault (Event Types.Noop 0 0) car.event

        name =
            event.name

        newThis =
            case name of
                Drive Up ->
                    Block3d.translateIn Direction3d.negativeX (Length.meters speed) car.this

                Drive Down ->
                    Block3d.translateIn Direction3d.positiveX (Length.meters speed) car.this

                Drive Left ->
                    Block3d.translateIn Direction3d.negativeY (Length.meters speed) car.this

                Drive Right ->
                    Block3d.translateIn Direction3d.positiveY (Length.meters speed) car.this

                _ ->
                    car.this

        horizontalAxis =
            case name of
                Drive Up ->
                    Axis3d.withDirection Direction3d.negativeX car.center

                Drive Down ->
                    Axis3d.withDirection Direction3d.positiveX car.center

                Drive Left ->
                    Axis3d.withDirection Direction3d.negativeY car.center

                _ ->
                    Axis3d.withDirection Direction3d.positiveY car.center

        carsExceptSelf =
            List.filter (\everyCar -> not (everyCar == car)) cars

        exPoint =
            Point3d.along horizontalAxis (Length.meters speed)

        dirSelf =
            case model.self.event of
                Nothing ->
                    R

                Just selfEvent ->
                    case selfEvent.name of
                        Rotate dir ->
                            dir

                        _ ->
                            R

        preSelf =
            if model.self.event /= Nothing then
                stampBlock dirSelf model.self

            else
                model.self

        examThis =
            \cube -> Quantity.lessThan (Length.meters 1.99) (Point3d.distanceFrom exPoint cube.center) && Quantity.greaterThanOrEqualTo (Length.meters 0) (Point3d.distanceFrom exPoint cube.center)

        newCenter =
            Point3d.along horizontalAxis (Length.meters speed)
    in
    if List.any examThis (carsExceptSelf ++ [ model.self, preSelf ]) && model.world == Reversed then
        car

    else if List.any examThis (carsExceptSelf ++ [ model.self, preSelf ]) && model.self.event /= Nothing then
        car

    else
        { car | this = newThis, center = newCenter }



-----------------car-----------------
----------level 3----------


updateInterlude3 : Float -> Float -> Angle -> Length -> Angle -> GameState -> GameState
updateInterlude3 time duration originalElevation originalDistance originalAzimuth model =
    let
        ratio =
            0.15

        targetElevation =
            Angle.degrees 40

        targetDistance =
            Length.meters 50

        tartgetAzimuth =
            Angle.degrees -58

        ( newElevation, newDistance, newAzimuth ) =
            if time <= ratio * duration then
                ( targetElevation |> Quantity.minus originalElevation |> Quantity.multiplyBy ((sin (time / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalElevation
                , targetDistance |> Quantity.minus originalDistance |> Quantity.multiplyBy ((sin (time / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalDistance
                , tartgetAzimuth |> Quantity.minus originalAzimuth |> Quantity.multiplyBy ((sin (time / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalAzimuth
                )

            else if time >= (1 - ratio) * duration then
                ( targetElevation |> Quantity.minus originalElevation |> Quantity.multiplyBy ((sin ((duration - time) / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalElevation
                , targetDistance |> Quantity.minus originalDistance |> Quantity.multiplyBy ((sin ((duration - time) / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalDistance
                , tartgetAzimuth |> Quantity.minus originalAzimuth |> Quantity.multiplyBy ((sin ((duration - time) / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalAzimuth
                )

            else
                ( oldCamera.elevation, oldCamera.distance, oldCamera.azimuth )

        oldCamera =
            model.camera

        newCamera =
            { oldCamera | elevation = newElevation, distance = newDistance, azimuth = newAzimuth }

        ( newGameStatus, newWorld ) =
            if time >= duration then
                ( Play, Reversed )

            else
                ( Interlude (time + 1) duration originalElevation originalDistance originalAzimuth, Normal )

        text1 =
            { content = "... is there really no one who wants to stop for me?", top = 65, left = 65, opacity = 0, size = 1, event = { name = Types.Noop, init = 0, duration = 320 } }

        text2 =
            { content = "The world is reversed. I see another world. It's the inner world of people.", top = 65, left = 65, opacity = 0, size = 1, event = { name = Types.Noop, init = 0, duration = 320 } }

        text3 =
            { content = "They accept me.", top = 65, left = 65, opacity = 0, size = 1, event = { name = Types.Noop, init = 0, duration = 200 } }

        newModel =
            { model | camera = newCamera, gameStatus = newGameStatus, level3Lock = -1, time = model.time + 1, world = newWorld } |> updateCars 0.02 |> updateTexts3d |> updateText

        newNewModel =
            if time == 200 then
                makeText newModel text1

            else if time == 510 then
                makeText newModel text2

            else if time == 820 then
                makeText newModel text3

            else
                newModel
    in
    newNewModel



----------level 3----------
----------level 4----------


updateInterlude4 : Float -> Float -> Angle -> Length -> Angle -> GameState -> ( GameState, Cmd Msg )
updateInterlude4 time duration originalElevation originalDistance originalAzimuth model =
    let
        ratio =
            0.25

        originalFocalPoint =
            model.goal.center

        targetElevation =
            Angle.degrees 37

        targetDistance =
            Length.meters 50

        tartgetAzimuth =
            Angle.degrees 217

        ( newElevation, newDistance, newAzimuth ) =
            if time <= ratio * duration then
                ( targetElevation |> Quantity.minus originalElevation |> Quantity.multiplyBy ((sin (time / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalElevation
                , targetDistance |> Quantity.minus originalDistance |> Quantity.multiplyBy ((sin (time / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalDistance
                , tartgetAzimuth |> Quantity.minus originalAzimuth |> Quantity.multiplyBy ((sin (time / duration / ratio * pi - pi / 2) + 1) / 2) |> Quantity.plus originalAzimuth
                )
                -- else if time >= (1 - ratio) * duration then (targetElevation |> Quantity.minus originalElevation |> Quantity.multiplyBy (( sin ((duration-time)/duration/ratio*pi-pi/2) + 1 )/2) |> Quantity.plus originalElevation
                --                                 , targetDistance |> Quantity.minus originalDistance |> Quantity.multiplyBy (( sin ((duration-time)/duration/ratio*pi-pi/2) + 1 )/2) |> Quantity.plus originalDistance
                --                                 , tartgetAzimuth |> Quantity.minus originalAzimuth |> Quantity.multiplyBy (( sin ((duration-time)/duration/ratio*pi-pi/2) + 1 )/2) |> Quantity.plus originalAzimuth)

            else
                ( oldCamera.elevation, oldCamera.distance, oldCamera.azimuth )

        newFocalPoint =
            if time <= ratio * duration then
                Point3d.translateBy (Vector3d.xyOn SketchPlane3d.xy (Length.meters 3) (Length.meters -4) |> Vector3d.scaleBy ((sin (time / duration / ratio * pi - pi / 2) + 1) / 2)) originalFocalPoint

            else
                oldCamera.focalPoint

        oldCamera =
            model.camera

        newCamera =
            { oldCamera | elevation = newElevation, distance = newDistance, azimuth = newAzimuth, focalPoint = newFocalPoint }

        newGameStatus =
            if time >= duration then
                model.gameStatus

            else
                Interlude (time + 1) duration originalElevation originalDistance originalAzimuth

        text1 =
            { content = "I finally tell you.", top = 49, left = 46, opacity = 0, size = 1, event = { name = Types.Noop, init = 0, duration = 200 } }

        text3d1 =
            [ buildText3d "me too" (Point3d.meters 67 2 1) (Point3d.meters 57 5 -1) 0.3 180 Color.white 0 ]

        text3d2 =
            [ buildText3d "i love you" (Point3d.meters 48 9 1) (Point3d.meters 53 5 1) 0.2 -90 Color.white 0 ]

        ( newTexts3d, rev, msg ) =
            if time == 0 then
                ( [], [], Cmd.none )

            else if time == 320 then
                ( text3d2, text3d2, playSound "reverse_1" )

            else if time == 510 then
                ( model.texts3d ++ text3d1, model.texts3dRev ++ text3d1, playSound "reverse_3" )

            else if time == 700 then
                ( model.texts3d, model.texts3dRev, playSound "reverse_5" )

            else
                ( model.texts3d, model.texts3dRev, Cmd.none )

        newModel =
            if time == 750 then
                makeText { model | camera = newCamera, gameStatus = newGameStatus, time = model.time + 1, texts3d = newTexts3d, texts3dRev = rev } text1 |> updateTexts3d |> updateText

            else
                { model | camera = newCamera, gameStatus = newGameStatus, time = model.time + 1, texts3d = newTexts3d, texts3dRev = rev } |> updateTexts3d |> updateText
    in
    if time >= duration then
        reInit { model | level = 6 }

    else
        ( newModel, msg )



----------level 4----------


updateGEvents : GameState -> GameState
updateGEvents model =
    case model.event of
        Nothing ->
            model

        Just event ->
            case event.name of
                Reverse ->
                    let
                        t =
                            model.time - event.init

                        newEvent =
                            updateEvent model.time event
                    in
                    if t < 5 then
                        let
                            newCam =
                                turn model.camera
                        in
                        { model | camera = newCam }

                    else if t < 35 then
                        let
                            self =
                                model.self

                            newBlock =
                                self.this
                                    |> Block3d.translateIn Direction3d.positiveZ (Length.meters (0.02 * (toFloat t - 5) - (1041 / 2900)))

                            newSelf =
                                { self | this = newBlock }
                        in
                        { model | self = newSelf, event = newEvent }

                    else if t < 55 then
                        { model | event = newEvent }

                    else if t < 80 then
                        let
                            newCam =
                                turn model.camera
                        in
                        { model | camera = newCam }

                    else if t == 80 then
                        let
                            newCam =
                                turn model.camera

                            newWorld =
                                if model.world == Reversed then
                                    Normal

                                else
                                    Reversed

                            self =
                                model.self

                            newBlock =
                                buildBlock self.center

                            newSelf =
                                { self | this = newBlock }
                        in
                        { model | self = newSelf, camera = newCam, event = newEvent, world = newWorld, enableKey = True }

                    else
                        model

                _ ->
                    model



{- define different colored active blocks' behavior -}


updateActiveBlock : GameState -> Block -> Block
updateActiveBlock model block =
    let
        time =
            model.time

        self =
            model.self
    in
    if block.color == Color.lightRed || (model.level == 1 && model.gameStatus /= Play) then
        case block.event of
            Nothing ->
                if not model.playerRound then
                    let
                        x =
                            Point3d.xCoordinate block.center

                        x_ =
                            Point3d.xCoordinate self.center

                        y =
                            Point3d.yCoordinate block.center

                        y_ =
                            Point3d.yCoordinate self.center

                        dir1 =
                            if x |> Quantity.lessThan x_ then
                                Down

                            else if x |> Quantity.greaterThan x_ then
                                Up

                            else if y |> Quantity.lessThan y_ then
                                Right

                            else
                                Left

                        dir2 =
                            if y |> Quantity.lessThan y_ then
                                Right

                            else if y |> Quantity.greaterThan y_ then
                                Left

                            else if x |> Quantity.lessThan x_ then
                                Down

                            else
                                Up

                        dir =
                            if modBy 3 time == 0 then
                                dir1

                            else
                                dir2
                    in
                    if ifNextStepAvailable block dir model then
                        block
                            |> keyToEvent dir time
                            |> updateBlock model

                    else
                        block

                else
                    block

            _ ->
                block
                    |> updateBlock model

    else if (model.level == 6 || model.level == 1) && model.gameStatus == Play then
        let
            distance =
                round (Length.inCentimeters (Point3d.distanceFrom block.center (Point3d.meters 10 -10 10)))

            random =
                modBy 1100 distance
        in
        case block.event of
            Nothing ->
                if modBy random model.time == 0 then
                    case block.dirBefore of
                        G ->
                            block

                        Clock ->
                            let
                                dir =
                                    reverseDir block.dirBefore

                                newBlock =
                                    keyToEvent dir time block
                            in
                            updateBlock model newBlock

                        CounterClock ->
                            let
                                dir =
                                    reverseDir block.dirBefore

                                newBlock =
                                    keyToEvent dir time block
                            in
                            newBlock |> updateBlock model

                        _ ->
                            let
                                dir =
                                    reverseDir block.dirBefore
                            in
                            if ifNextStepAvailable block dir model then
                                block
                                    |> keyToEvent dir time
                                    |> updateBlock model

                            else
                                block

                else
                    block

            _ ->
                block
                    |> updateBlock model

    else
        block


reverseDir : Direction -> Direction
reverseDir dir =
    case dir of
        Up ->
            Down

        Down ->
            Up

        Left ->
            Right

        Right ->
            Left

        Clock ->
            CounterClock

        CounterClock ->
            Clock

        _ ->
            dir


updateBlock : GameState -> Block -> Block
updateBlock model block =
    let
        time =
            model.time
    in
    case block.event of
        Nothing ->
            block

        Just event ->
            let
                newEvent =
                    updateEvent time event

                --update the event to ( (Something duration--) or Nothing )
            in
            case event.name of
                Rotate _ ->
                    let
                        newBlock =
                            block
                                |> rotateBlock time event
                    in
                    { newBlock | event = newEvent }

                _ ->
                    block


examDistance : Block -> Block -> Length.Length -> Length.Length -> Bool
examDistance block1 block2 max min =
    let
        blockCenter =
            block1.center

        selfCenter =
            block2.center

        distance =
            Point3d.distanceFrom blockCenter selfCenter
    in
    Quantity.lessThanOrEqualTo max distance && Quantity.greaterThanOrEqualTo min distance


examLoseAndWarn : Direction -> GameState -> GameState
examLoseAndWarn key model =
    let
        preSelf =
            if model.self.event == Nothing then
                stampBlock key model.self

            else
                model.self

        newStatus =
            case model.level of
                5 ->
                    model.gameStatus

                6 ->
                    model.gameStatus

                _ ->
                    if List.any (\block -> examDistance block preSelf (Length.meters 2) (Length.meters 0)) model.actives && model.gameStatus == Play && preSelf.center /= model.goal.center then
                        Lose

                    else
                        model.gameStatus

        newModel =
            if List.any (\block -> examDistance block preSelf (Length.meters 4) (Length.meters 2.5)) model.actives then
                if model.text.event.duration == 0 then
                    case model.level of
                        1 ->
                            if model.gameStatus == Play then
                                if modBy 3 model.time == 0 then
                                    makeText model Level1.Text.text1

                                else if modBy 3 model.time == 1 then
                                    makeText model Level1.Text.text2

                                else
                                    makeText model Level1.Text.text3

                            else
                                model

                        5 ->
                            if modBy 2 model.time == 0 then
                                makeText model Level5.Text.text1

                            else
                                makeText model Level5.Text.text2

                        6 ->
                            if model.gameStatus == Play then
                                if modBy 3 model.time == 0 then
                                    makeText model Level6.Text.text1

                                else if modBy 3 model.time == 1 then
                                    makeText model Level6.Text.text2

                                else
                                    makeText model Level6.Text.text3

                            else
                                model

                        _ ->
                            model

                else
                    model

            else
                model
    in
    { newModel | gameStatus = newStatus }


ifNextStepAvailable : Block -> Direction -> GameState -> Bool
ifNextStepAvailable block dir model =
    if dir == R then
        let
            anchor =
                block.center

            texts3d =
                if model.world == Normal then
                    List.foldl pickText [] model.texts3dRev

                else
                    List.foldl pickText [] model.texts3d

            pickText text3d list =
                if text3d.time == -2 then
                    list

                else
                    list ++ text3d.wall

            helper =
                \cube -> cube.center == anchor
        in
        not <| List.any helper texts3d

    else
        let
            anchor =
                block.center

            horizontalAxis =
                case dir of
                    Up ->
                        Axis3d.withDirection Direction3d.negativeX anchor

                    Down ->
                        Axis3d.withDirection Direction3d.positiveX anchor

                    Left ->
                        Axis3d.withDirection Direction3d.negativeY anchor

                    _ ->
                        Axis3d.withDirection Direction3d.positiveY anchor

            exPoint =
                Point3d.along horizontalAxis (Length.meters 2)

            texts3d =
                if model.world == Normal then
                    List.foldl pickText [] model.texts3d

                else
                    List.foldl pickText [] model.texts3dRev

            pickText text3d list =
                if text3d.time == -2 then
                    list

                else
                    list ++ text3d.wall

            helper =
                \cube -> Quantity.lessThanOrEqualTo (Length.meters 1.99) (Point3d.distanceFrom exPoint cube.center) && Quantity.greaterThanOrEqualTo (Length.meters 0) (Point3d.distanceFrom exPoint cube.center)

            object =
                model.actives ++ model.nactives ++ model.wall ++ texts3d ++ model.self :: model.cars
        in
        not <| List.any helper object


turn : CameraOpt -> CameraOpt
turn camera =
    let
        newElevation =
            camera.elevation
                |> Quantity.minus (Angle.degrees 6)
    in
    { camera | elevation = newElevation }


reInit : GameState -> ( GameState, Cmd Msg )
reInit model =
    let
        ( model_, msg ) =
            case model.level of
                1 ->
                    Level1.Model.init

                2 ->
                    Level2.Model.init

                3 ->
                    case model.gameStatus of
                        LoseFadeOut _ _ ->
                            let
                                ( tModel, tMsg ) =
                                    Level3.Model.init

                                newModel =
                                    { tModel | level3Lock = model.level3Lock }
                            in
                            ( newModel, tMsg )

                        _ ->
                            Level3.Model.init

                4 ->
                    Level4.Model.init

                5 ->
                    Level5.Model.init

                6 ->
                    Level6.Model.init

                _ ->
                    Model.init
    in
    ( model_, msg )


updateText : GameState -> GameState
updateText model =
    let
        textNow =
            model.text

        newTop =
            if textNow.event.init + textNow.event.duration - model.time > 3 * textNow.event.duration // 4 || textNow.event.init + textNow.event.duration - model.time < textNow.event.duration // 4 then
                textNow.top - 0.01

            else
                textNow.top

        newOpacity =
            if textNow.event.init + textNow.event.duration - model.time > 3 * textNow.event.duration // 4 then
                textNow.opacity + 0.04

            else if textNow.event.init + textNow.event.duration - model.time < textNow.event.duration // 4 then
                textNow.opacity - 0.04

            else
                textNow.opacity

        textUpdated =
            { textNow | top = newTop, opacity = newOpacity }

        ifEnd =
            if textNow.event.init + textNow.event.duration - model.time == 0 then
                True

            else
                False

        -- 文字显示结束了吗
    in
    if ifEnd then
        { model | text = Level1.Model.initText }

    else
        { model | text = textUpdated }


makeText : GameState -> Text -> GameState
makeText model text =
    let
        newEvent =
            { name = WordEmerge, init = model.time, duration = text.event.duration }

        newText =
            { text | event = newEvent }
    in
    { model | text = newText }


switchLevel : Int -> Int
switchLevel level =
    case level of
        1 ->
            2

        2 ->
            3

        3 ->
            4

        4 ->
            5

        5 ->
            6

        6 ->
            0

        _ ->
            level



----------- Pause Game -----------


updatePause : Bool -> GameState -> GameState
updatePause bool model =
    if bool == True && model.gameStatus == Play then
        { model | gameStatus = Paused }

    else if model.gameStatus == Paused then
        { model | gameStatus = Play }

    else
        model



----------- Pause Game -----------
