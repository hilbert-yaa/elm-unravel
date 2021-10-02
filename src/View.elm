module View exposing (view)

import Angle
import Block3d exposing (Block3d)
import Browser
import Camera3d
import Color
import Direction3d
import Html exposing (Html, br, button, div, h1, img, input, p, text)
import Html.Attributes exposing (alt, id, list, src, step, style, type_, value)
import Html.Events exposing (onClick, onInput)
import Illuminance exposing (Illuminance)
import Length
import Level6.Model exposing (initY)
import LuminousFlux
import Model exposing (Model)
import Msg exposing (Msg(..))
import Pixels
import Plane3d
import Point3d
import Quantity
import Scene3d
import Scene3d.Light as Light
import Scene3d.Material as Material
import Sphere3d
import String
import Temperature
import Text3d exposing (t)
import Types exposing (..)
import Viewpoint3d


renderGame : Model -> Html Msg
renderGame model =
    let
        { width, height } =
            model.screen

        self =
            Scene3d.blockWithShadow (Material.matte model.self.color) model.self.this

        actives =
            List.map (\block -> Scene3d.blockWithShadow (Material.matte block.color) block.this) model.actives

        nactives =
            List.map (\block -> Scene3d.blockWithShadow (Material.matte block.color) block.this) model.nactives

        cars =
            List.map (\block -> Scene3d.blockWithShadow (Material.matte block.color) block.this) model.cars

        text3dWall =
            if model.world == Normal then
                List.foldl pickWall [] model.texts3d

            else
                List.foldl pickWall [] model.texts3dRev

        pickWall text3d list =
            if text3d.time == -2 then
                list

            else
                list ++ text3d.wall

        wall =
            if model.godMode then
                List.map (\block -> Scene3d.blockWithShadow (Material.matte block.color) block.this) (model.wall ++ text3dWall)

            else
                [ Scene3d.nothing ]

        len =
            model.groundSize.l * 2

        wid =
            model.groundSize.w * 2

        he =
            Scene3d.blockWithShadow (Material.color Color.white) (Block3d.from (Point3d.meters 0 34 0) (Point3d.meters 2 36 2))

        floor =
            Block3d.from (Point3d.meters wid len 0) (Point3d.meters -wid -len -0.01)

        ground =
            case model.level of
                6 ->
                    let
                        rgb =
                            90

                        color =
                            if model.level6Lock then
                                Color.black

                            else
                                case model.gameStatus of
                                    Play ->
                                        Color.rgb255 rgb rgb rgb

                                    Interlude time duration _ _ _ ->
                                        let
                                            t =
                                                time / duration * rgb |> round
                                        in
                                        Color.rgb255 t t t

                                    _ ->
                                        Color.rgb255 rgb rgb rgb
                    in
                    Scene3d.block (Material.matte color) floor

                _ ->
                    Scene3d.block (Material.matte Color.darkGrey) floor

        background =
            case model.level of
                6 ->
                    let
                        r =
                            160

                        g =
                            202

                        b =
                            235

                        color =
                            if model.level6Lock then
                                Color.black

                            else
                                case model.gameStatus of
                                    Play ->
                                        Color.rgb255 r g b

                                    Interlude time duration _ _ _ ->
                                        Color.rgb255 (time / duration * r |> round) (time / duration * g |> round) (time / duration * b |> round)

                                    _ ->
                                        Color.rgb255 r g b
                    in
                    Scene3d.backgroundColor color

                _ ->
                    Scene3d.backgroundColor model.scene.background

        settings =
            model.settings

        texts3d =
            if model.godMode then
                if model.world == Normal then
                    List.foldl godText [] model.texts3d

                else
                    List.foldl godText [] model.texts3dRev

            else if model.world == Normal then
                List.foldl pickText [] model.texts3d

            else
                List.foldl pickText [] model.texts3dRev

        pickText text3d list =
            if text3d.time <= 0 then
                list

            else
                text3d.entities :: list

        godText text3d list =
            list ++ [ text3d.entities ]

        entities =
            if model.level == 6 then
                [ ground, self, settings, he ] ++ actives ++ nactives ++ wall ++ cars ++ texts3d

            else
                [ ground, self, settings ] ++ actives ++ nactives ++ wall ++ cars ++ texts3d

        camera =
            case model.level of
                0 ->
                    Camera3d.perspective
                        { viewpoint =
                            Viewpoint3d.lookAt
                                { eyePoint = Point3d.meters 25 -9 36
                                , focalPoint = model.camera.focalPoint
                                , upDirection = Direction3d.positiveZ
                                }
                        , verticalFieldOfView = Angle.degrees 30
                        }

                _ ->
                    Camera3d.perspective
                        { viewpoint = Viewpoint3d.orbitZ model.camera
                        , verticalFieldOfView = Angle.degrees 30
                        }

        lights =
            switchLight model

        opacity =
            case model.gameStatus of
                Interlude time duration _ _ _ ->
                    if model.level == 4 && time >= 700 then
                        "0"

                    else
                        "1"

                Animation frame ->
                    if model.level == 6 && frame == 5 && model.frameTime > 1 then
                        String.fromFloat (toFloat model.frameTime / 80)

                    else if model.level == 6 && frame > 5 then
                        "0"

                    else
                        "1"

                _ ->
                    "1"
    in
    div
        [ style "opacity" opacity
        ]
        [ Scene3d.custom
            { antialiasing = Scene3d.supersampling <| 0.1 * toFloat model.scene.renderOpt
            , entities = entities
            , camera = camera
            , clipDepth = Length.meters 10
            , background = background
            , dimensions = ( width, height )
            , lights = lights
            , whiteBalance = Light.incandescent
            , exposure = Scene3d.exposureValue 5
            , toneMapping = Scene3d.noToneMapping
            }
        ]


preGameView : Model -> Html Msg
preGameView model =
    let
        fade =
            0.1

        alpha =
            case model.gameStatus of
                PreGame time duration ->
                    if time < fade * duration then
                        time / (fade * duration)

                    else if time > (1 - fade * 2) * duration then
                        (duration * (1 - fade) - time) / (fade * duration)

                    else if time > (1 - fade) * duration then
                        0

                    else
                        1

                _ ->
                    0

        ( background, title, words ) =
            case model.level of
                1 ->
                    ( "#222222"
                    , "STORE"
                    , [ text "I hate shopping days. The food in the belly is the recompense for the horrific torture of the heart."
                      , br [] []
                      , text "Those strangers will chew up my bones, my flesh and my wretched soul."
                      ]
                    )

                2 ->
                    ( "#333333"
                    , "BLACK DOG"
                    , [ text "I fall into the deep dream."
                      , br [] []
                      , text "I see the black dog. I know it is him. It stirs in the shadows, waiting for me to stop and swallow me up. I can't stop."
                      , br [] []
                      , text "I have a black dog. His name is depression."
                      ]
                    )

                3 ->
                    ( "#333333"
                    , "ANOTHER WORLD"
                    , [ text "I walk through endless dreams and meet a never-ending cycle of death."
                      , br [] []
                      , text "The traffic flows uninterruptedly. No one is willing to wait for me to cross."
                      ]
                    )

                4 ->
                    ( "#444444"
                    , "ABOUT YOU"
                    , [ text "I want to tell you"
                      , br [] []
                      , text "all of those tangled secrets."
                      ]
                    )

                5 ->
                    ( "#333333"
                    , "RAIN"
                    , [ text "It is a mediocre downpour, which is as bleak as ever. However, it is no longer dark as usual."
                      , br [] []
                      , text "I find them, like shadows with a faint light."
                      ]
                    )

                6 ->
                    ( "#333333"
                    , "WAKE UP"
                    , [ text "I walk through the long darkness, with the real and the dream, the unreality and the disappointment."
                      , br [] []
                      , text "For the first time, I was able to touch the real world and hear their voice."
                      ]
                    )

                _ ->
                    ( "#333333"
                    , ""
                    , [ text "" ]
                    )
    in
    case model.level of
        0 ->
            div
                [ style "background" "black"
                , style "text-align" "center"
                , style "height" "100%"
                , style "width" "100%"
                , style "position" "absolute"
                , style "text-align" "center"
                , style "justify-content" "center"
                , style "opacity" (String.fromFloat alpha)
                , style "display"
                    (if alpha > 0 then
                        "flex"

                     else
                        "none"
                    )
                ]
                [ Html.img
                    [ style "position" "absolute"
                    , style "top" "7%"
                    , style "width" "650px"
                    , style "height" "650px"
                    , src "./assets/logo_white.png"
                    , alt "Expeditioner"
                    , style "opacity" (String.fromFloat alpha)
                    ]
                    []
                , h1
                    [ style "white-space" "pre"
                    , style "position" "absolute"
                    , style "display" "table"
                    , style "top" "73%"
                    , style "color" "white"
                    , style "text-align" "center"
                    , style "font-size" "40px"
                    , style "font-family" "Century Gothic"
                    , style "font-weight" "100"
                    , style "opacity" (String.fromFloat alpha)
                    , style "letter-spacing" "50px"
                    ]
                    [ text " PRESENT" ]
                ]

        _ ->
            div
                [ style "background" background
                , style "text-align" "center"
                , style "height" "100%"
                , style "width" "100%"
                , style "position" "absolute"
                , style "left" "0"
                , style "top" "0"
                , style "font-family" "Century Gothic"
                , style "font-size" "48px"
                , style "color" "#FFFFFF"
                , style "opacity" (String.fromFloat alpha)
                , style "display"
                    (if alpha > 0 then
                        "flex"

                     else
                        "none"
                    )
                ]
                [ p
                    [ style "position" "absolute"
                    , style "top" "55%"
                    , style "width" "100%"
                    , style "text-align" "center"
                    , style "font-size" "0.8vw"
                    , style "letter-spacing" "0.5px"
                    , style "opacity" (String.fromFloat alpha)
                    ]
                    words
                , p
                    [ style "position" "absolute"
                    , style "letter-spacing" "20px"
                    , style "top" "30%"
                    , style "width" "100%"
                    , style "text-align" "center"
                    , style "font-size" "2.5vw"
                    , style "opacity" (String.fromFloat alpha)
                    ]
                    [ text title ]
                ]


renderText : Model -> Html Msg
renderText model =
    let
        content =
            model.text.content

        top =
            String.fromFloat model.text.top ++ "%"

        left =
            String.fromFloat model.text.left ++ "%"

        size =
            String.fromFloat model.text.size ++ "vw"

        opacity =
            String.fromFloat model.text.opacity
    in
    div
        [ style "font-family" "Century Gothic"
        , style "letter-spacing" "2px"
        , style "font-size" size
        , style "color" "#FFFFFF"
        , style "position" "absolute"
        , style "width" "500px"
        , style "height" "600px"
        , style "left" left
        , style "top" top
        , style "opacity" opacity
        ]
        [ Html.text content ]


renderEscMenu : Model -> Html Msg
renderEscMenu model =
    if model.gameStatus == Paused then
        let
            renderOpt =
                model.scene.renderOpt
        in
        div
            [ style "background-color" "#515158"
            , style "width" "40%"
            , style "height" "40%"
            , style "position" "absolute"
            , style "top" "30%"
            , style "left" "30%"
            , style "border-radius" "0.5vw"
            , style "padding" "2vh 2vw"
            , style "font-family" "Century Gothic"
            , style "font-size" "2vw"
            , style "opacity" "0.85"
            ]
            [ text "Settings"
            , br [] []
            , div
                [ style "font-size" "1.2vw"
                , style "color" "white"
                ]
                [ slider 20 renderOpt
                , text "Graphic Quality"
                ]
            , div
                [ style "font-size" "1.2vw"
                , style "color" "white"
                , style "margin" "15vh 0"
                , style "text-align" "center"
                , onClick (Pause False)
                ]
                [ text "Return"
                ]
            ]

    else
        div [] []


slider : Int -> Int -> Html Msg
slider step value =
    input
        [ style "margin" "5vh 1vw"
        , type_ "range"
        , Html.Attributes.min "5"
        , Html.Attributes.max (String.fromInt step)
        , Html.Attributes.step "1"
        , Html.Attributes.value (String.fromInt value)
        , onInput Option
        ]
        []


view : Model -> Html Msg
view model =
    let
        this =
            case model.actives of
                head :: _ ->
                    head

                [] ->
                    model.self

        opacity =
            if model.level == 0 then
                toFloat model.frameTime / 100

            else
                case model.gameStatus of
                    LoseFadeOut time duration ->
                        time / duration

                    WinFadeOut _ time duration ->
                        time / duration

                    StartFadeIn time duration ->
                        time / duration

                    LevelChange _ ->
                        0

                    Animation frame ->
                        if frame == 5 && model.level == 1 then
                            0

                        else
                            1

                    _ ->
                        1
    in
    div
        [ style "background-color" "black"
        , style "scroll" "no"
        , style "overflow" "hidden"
        ]
        [ div
            [ style "opacity" (String.fromFloat opacity)
            , style "background-color" "black"
            ]
            [ renderGame model
            , renderText model
            , renderEscMenu model
            , preGameView model
            , p
                --debug time
                [ style "position" "absolute"
                , style "top" "1%"
                , style "background-color" "white"
                , style "opacity" "0"
                ]
                [-- text <| ("time: " ++ Debug.toString model.gameStatus)
                 -- , br[][]
                 -- , text <| ("azimuth: " ++ Debug.toString model.self)
                 -- , br[][]
                ]
            ]
        ]



{- switch light based on levels and world -}


switchLight : Model -> Scene3d.Lights coordinates
switchLight model =
    case ( model.level, model.world ) of
        ( 0, Normal ) ->
            let
                light1 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters -2 -2 5
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 10000
                        }

                light2 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 7 5
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 3000
                        }

                light3 =
                    Light.directional (Light.castsShadows True)
                        { chromaticity = Light.incandescent
                        , intensity = Illuminance.lux 1
                        , direction = Direction3d.negativeZ
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux 2
                        , intensityBelow = Illuminance.lux 5
                        }
            in
            Scene3d.threeLights light1 light2 softLighting

        ( 0, Reversed ) ->
            let
                light1 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 10
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 60000
                        }

                light2 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 20
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 100000
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux 80
                        , intensityBelow = Illuminance.lux 80
                        }
            in
            Scene3d.threeLights light1 light2 softLighting

        ( 1, Normal ) ->
            let
                light1 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters -2 -2 5
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 10000
                        }

                light2 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 38 3
                        , chromaticity = Light.chromaticity { x = 0.63, y = 0.33 }

                        -- , chromaticity = Light.colorTemperature (Temperature.kelvins 2856)
                        , intensity = LuminousFlux.lumens 30000
                        }

                light3 =
                    Light.directional (Light.castsShadows True)
                        { chromaticity = Light.incandescent
                        , intensity = Illuminance.lux 1
                        , direction = Direction3d.negativeZ
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux 2
                        , intensityBelow = Illuminance.lux 5
                        }

                goalLighting =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 5 31 1
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 1000
                        }
            in
            Scene3d.fourLights light1 light2 light3 softLighting

        ( 1, Reversed ) ->
            let
                light1 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 10 10
                        , chromaticity = Light.colorTemperature (Temperature.kelvins 7600)
                        , intensity = LuminousFlux.lumens 150000
                        }

                light2 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 50 20
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 10000
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux 80
                        , intensityBelow = Illuminance.lux 80
                        }
            in
            Scene3d.threeLights light1 light2 softLighting

        ( 2, Normal ) ->
            let
                light1Lumen =
                    toFloat (60000 - 40 * model.time)

                softLightingLumen =
                    80 - 0.05 * toFloat model.time

                light1 =
                    Light.point (Light.castsShadows False)
                        { position = Point3d.meters 0 0 10
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens light1Lumen
                        }

                light2 =
                    Light.point (Light.castsShadows False)
                        { position = Point3d.meters 0 0 20
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 100000
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux softLightingLumen
                        , intensityBelow = Illuminance.lux softLightingLumen
                        }
            in
            Scene3d.twoLights light1 softLighting

        ( 2, Reversed ) ->
            let
                light1 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 10
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 60000
                        }

                light2 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 20
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 100000
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux 80
                        , intensityBelow = Illuminance.lux 80
                        }
            in
            Scene3d.threeLights light1 light2 softLighting

        ( 3, Normal ) ->
            let
                light1 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 10
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 60000
                        }

                light2 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 20
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 100000
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux 20
                        , intensityBelow = Illuminance.lux 20
                        }

                goalLighting =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 1 19 1
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 5000
                        }
            in
            Scene3d.threeLights light1 light2 softLighting

        ( 3, Reversed ) ->
            let
                light1 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 10
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 60000
                        }

                light2 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 20
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 100000
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux 80
                        , intensityBelow = Illuminance.lux 80
                        }
            in
            Scene3d.threeLights light1 light2 softLighting

        ( 5, Normal ) ->
            let
                light1 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 10
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 6000
                        }

                light2 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 20
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 10000
                        }

                goalLighting =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters -19 19 1
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 5000
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux 0
                        , intensityBelow = Illuminance.lux 0
                        }
            in
            Scene3d.fourLights light1 light2 goalLighting softLighting

        ( 5, Reversed ) ->
            let
                light1 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 10 10
                        , chromaticity = Light.colorTemperature (Temperature.kelvins 7600)
                        , intensity = LuminousFlux.lumens 15000
                        }

                light2 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 50 20
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 10000
                        }

                goalLighting =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters -19 19 1
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 5000
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux 10
                        , intensityBelow = Illuminance.lux 10
                        }
            in
            Scene3d.fourLights light1 light2 goalLighting softLighting

        ( 4, Normal ) ->
            let
                ratio =
                    0.25

                center =
                    Point3d.toRecord Length.inMeters (Block3d.centerPoint model.self.this)

                light1 =
                    case model.gameStatus of
                        Interlude time duration _ _ _ ->
                            if time > 0.125 * duration && time <= 0.25 * duration then
                                Light.point (Light.castsShadows True)
                                    { position = Point3d.meters center.x center.y 5
                                    , chromaticity = Light.incandescent
                                    , intensity = LuminousFlux.lumens (100000 - 50000 * time / 0.125 / duration)
                                    }

                            else if time <= 0.125 * duration && time >= 0 then
                                Light.point (Light.castsShadows True)
                                    { position = Point3d.meters center.x center.y 5
                                    , chromaticity = Light.incandescent
                                    , intensity = LuminousFlux.lumens 50000
                                    }

                            else
                                Light.point (Light.castsShadows True)
                                    { position = Point3d.meters center.x center.y 5
                                    , chromaticity = Light.incandescent
                                    , intensity = LuminousFlux.lumens 0
                                    }

                        _ ->
                            Light.point (Light.castsShadows True)
                                { position = Point3d.meters center.x center.y 5
                                , chromaticity = Light.incandescent
                                , intensity = LuminousFlux.lumens 50000
                                }

                softLighting =
                    case model.gameStatus of
                        Interlude time duration _ _ _ ->
                            if time > 0.125 * duration && time <= 0.25 * duration then
                                Light.soft
                                    { upDirection = Direction3d.positiveZ
                                    , chromaticity = Light.fluorescent
                                    , intensityAbove = Illuminance.lux (80 - 40 * time / 0.125 / duration)
                                    , intensityBelow = Illuminance.lux (80 - 40 * time / 0.125 / duration)
                                    }

                            else if time <= 0.125 * duration && time >= 0 then
                                Light.soft
                                    { upDirection = Direction3d.positiveZ
                                    , chromaticity = Light.fluorescent
                                    , intensityAbove = Illuminance.lux 40
                                    , intensityBelow = Illuminance.lux 40
                                    }

                            else
                                Light.soft
                                    { upDirection = Direction3d.positiveZ
                                    , chromaticity = Light.fluorescent
                                    , intensityAbove = Illuminance.lux 0
                                    , intensityBelow = Illuminance.lux 0
                                    }

                        _ ->
                            Light.soft
                                { upDirection = Direction3d.positiveZ
                                , chromaticity = Light.fluorescent
                                , intensityAbove = Illuminance.lux 40
                                , intensityBelow = Illuminance.lux 40
                                }

                light2 =
                    -- lamp 2
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 59 5 5
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 10000
                        }
            in
            Scene3d.threeLights light1 softLighting light2

        ( 4, Reversed ) ->
            let
                center =
                    Point3d.toRecord Length.inMeters (Block3d.centerPoint model.self.this)

                light1 =
                    case model.gameStatus of
                        Interlude time duration _ _ _ ->
                            if time > 0.125 * duration && time <= 0.25 * duration then
                                Light.point (Light.castsShadows True)
                                    { position = Point3d.meters center.x center.y 5
                                    , chromaticity = Light.incandescent
                                    , intensity = LuminousFlux.lumens (100000 - 50000 * time / 0.125 / duration)
                                    }

                            else if time <= 0.125 * duration && time >= 0 then
                                Light.point (Light.castsShadows True)
                                    { position = Point3d.meters center.x center.y 5
                                    , chromaticity = Light.incandescent
                                    , intensity = LuminousFlux.lumens 50000
                                    }

                            else
                                Light.point (Light.castsShadows True)
                                    { position = Point3d.meters center.x center.y 5
                                    , chromaticity = Light.incandescent
                                    , intensity = LuminousFlux.lumens 0
                                    }

                        _ ->
                            Light.point (Light.castsShadows True)
                                { position = Point3d.meters center.x center.y 5
                                , chromaticity = Light.incandescent
                                , intensity = LuminousFlux.lumens 50000
                                }

                light2 =
                    -- lamp 2
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 59 5 5
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 10000
                        }
            in
            Scene3d.twoLights light1 light2

        ( 6, Normal ) ->
            let
                selfY =
                    Quantity.ratio (model.self.this |> Block3d.centerPoint |> Point3d.yCoordinate) (Length.meters 1)

                light1 =
                    -- lamp 1
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters -6 (initY + 20) 5
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 10000
                        }

                light2 =
                    -- lamp 2
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 -100 5
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 10000
                        }

                light3 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 38 3
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens (60000 * lumi / max)
                        }

                light5 =
                    Light.directional (Light.castsShadows True)
                        { direction = Direction3d.xyZ (Angle.degrees -60) (Angle.degrees 30)
                        , chromaticity = Light.incandescent
                        , intensity = Illuminance.lux 80
                        }

                light4 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 10
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens (60000 * lumi / max)
                        }

                max =
                    80

                lumi =
                    if model.level6Lock then
                        1.5

                    else
                        case model.gameStatus of
                            Play ->
                                max

                            Interlude time duration _ _ _ ->
                                time / duration * max

                            _ ->
                                max

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux lumi
                        , intensityBelow = Illuminance.lux lumi
                        }
            in
            if model.level6Lock then
                Scene3d.threeLights light1 light2 softLighting

            else
                Scene3d.fourLights light3 light4 light5 softLighting

        _ ->
            let
                light1 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 10
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 60000
                        }

                light2 =
                    Light.point (Light.castsShadows True)
                        { position = Point3d.meters 0 0 20
                        , chromaticity = Light.incandescent
                        , intensity = LuminousFlux.lumens 100000
                        }

                softLighting =
                    Light.soft
                        { upDirection = Direction3d.positiveZ
                        , chromaticity = Light.fluorescent
                        , intensityAbove = Illuminance.lux 80
                        , intensityBelow = Illuminance.lux 80
                        }
            in
            Scene3d.twoLights light1 softLighting
