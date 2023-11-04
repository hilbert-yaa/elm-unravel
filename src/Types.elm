module Types exposing (..)

import Angle exposing (Angle)
import Axis3d
import Block3d exposing (Block3d)
import Color exposing (Color)
import Cylinder3d
import Direction3d exposing (positiveZ)
import Length exposing (Length, Meters)
import Pixels exposing (Pixels)
import Plane3d exposing (Plane3d)
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Light exposing (Chromaticity, Light)
import Scene3d.Material as Material
import Sphere3d
import Text3d exposing (..)
import Vector3d


type WorldCoordinates
    = Dummy


type alias ScreenSize =
    { width : Quantity Int Pixels
    , height : Quantity Int Pixels
    }


type alias CameraOpt =
    { focalPoint : Point3d Meters WorldCoordinates
    , azimuth : Angle -- Orbiting angle of the camera around the focal point
    , elevation : Angle -- Angle of the camera up from the XY plane
    , distance : Quantity Float Meters
    }


type alias Block =
    { this : Block3d Meters WorldCoordinates
    , center : Point3d Meters WorldCoordinates
    , color : Color
    , event : Maybe Event
    , dirBefore : Direction
    }


type alias Goal =
    { center : Point3d Meters WorldCoordinates }


type alias Event =
    { name : EventType
    , init : Int
    , duration : Int
    }


type alias Text =
    { content : String
    , top : Float
    , left : Float
    , opacity : Float
    , size : Float
    , event : Event
    }


type EventType
    = Rotate Direction
    | Noop
    | Reverse
    | WordEmerge
    | Drive Direction
    | Shake


type Direction
    = Up
    | Down
    | Left
    | Right
    | R
    | Clock
    | CounterClock
    | G


type WorldType
    = Normal
    | Reversed


type GamePhase
    = LevelChange Int
    | Animation Int
    | Paused
    | Play
    | PreGame Float Float
    | Lose
    | FadeOut Float
    | LoseFadeOut Float Float
    | StartFadeIn Float Float
    | PrePreGame Float Float
    | Interlude Float Float Angle Length Angle
    | WinFadeOut Int Float Float


type alias GroundSize =
    { l : Float --y
    , w : Float --x
    }


type alias SceneSettings =
    { background : Color
    , renderOpt : Int
    , luminance : Float
    }


type alias Text3d =
    { str : String
    , anchor : Point3d Length.Meters WorldCoordinates
    , scale : Float
    , rot : Float
    , color : Color
    , occupiedCenters : List (Point3d Length.Meters WorldCoordinates)
    , entities : Scene3d.Entity WorldCoordinates
    , wall : List Block
    , time : Float --animaiton time

    -- -1 -> text invisible, wall enabled
    -- -2 -> text invisible, wall disabled
    }


lamp : Point3d Meters WorldCoordinates -> Float -> Scene3d.Entity WorldCoordinates
lamp anchor angle =
    let
        dr =
            Vector3d.from Point3d.origin anchor

        rod1 =
            Scene3d.cylinderWithShadow (Material.color (Color.rgb255 15 15 15)) <|
                -- Scene3d.cylinderWithShadow (Material.color Color.darkCharcoal) <|
                Cylinder3d.startingAt
                    Point3d.origin
                    Direction3d.positiveZ
                    { radius = Length.meters 0.15
                    , length = Length.meters 6
                    }

        rod2 =
            -- Scene3d.cylinderWithShadow (Material.color Color.darkCharcoal) <|
            Scene3d.cylinderWithShadow (Material.color (Color.rgb255 15 15 15)) <|
                Cylinder3d.startingAt
                    (Point3d.meters 0 0 5.85)
                    Direction3d.positiveX
                    { radius = Length.meters 0.15
                    , length = Length.meters 1
                    }

        bulb =
            Scene3d.sphereWithShadow (Material.color Color.white) <|
                Sphere3d.atPoint (Point3d.meters 1 0 5.4)
                    (Length.meters 0.25)
    in
    Scene3d.group [ rod1, rod2, bulb ]
        |> Scene3d.rotateAround Axis3d.z (Angle.degrees angle)
        |> Scene3d.translateBy dr


road : Point3d Meters WorldCoordinates -> Point3d Meters WorldCoordinates -> Color -> Scene3d.Entity WorldCoordinates
road point1 point2 color =
    Scene3d.block (Material.matte color) (Block3d.from point1 point2)


-- constants


rotateRate =
    Angle.degrees 6


blockLen =
    Length.meters 2


playerCameraDistance =
    Length.meters 20


buildText3d : String -> Point3d Meters WorldCoordinates -> Point3d Meters WorldCoordinates -> Float -> Float -> Color -> Float -> Text3d
buildText3d str anchor firstBlockCenter scale rot color ifWallInit =
    let
        strLength =
            List.length (String.toList str)

        length =
            ceiling (toFloat (strLength * 6 - 1) * scale / 2)

        dr =
            Vector3d.from Point3d.origin firstBlockCenter

        coordinates =
            List.map (\yc -> Point3d.translateBy dr (roundPoint (Point3d.rotateAround Axis3d.z (Angle.degrees rot) (Point3d.meters 0 (toFloat (2 * yc)) 0)))) (List.range 0 (length - 1))

        roundPoint point =
            let
                x_ =
                    Quantity.toFloatQuantity (Quantity.round (Point3d.xCoordinate point))

                y_ =
                    Quantity.toFloatQuantity (Quantity.round (Point3d.yCoordinate point))

                z_ =
                    Quantity.toFloatQuantity (Quantity.round (Point3d.zCoordinate point))
            in
            Point3d.xyz x_ y_ z_

        entities =
            text3d str anchor scale { a = rot, b = 0, c = 0 }

        wall =
            List.map (\center -> buildColorBlock center Color.lightYellow Nothing R) coordinates
    in
    Text3d str anchor scale rot color coordinates entities wall ifWallInit


buildText3dRot : String -> Point3d Meters WorldCoordinates -> Point3d Meters WorldCoordinates -> Float -> Float -> Color -> Float -> Text3d
buildText3dRot str anchor firstBlockCenter scale rot color ifWallInit =
    let
        strLength =
            List.length (String.toList str)

        length =
            ceiling (toFloat (strLength * 6 - 1) * scale / 2)

        dr =
            Vector3d.from Point3d.origin firstBlockCenter

        coordinates =
            --我寄几也读不懂了dbq
            List.map (\yc -> Point3d.translateBy dr (roundPoint (Point3d.rotateAround Axis3d.z (Angle.degrees rot) (Point3d.meters 0 (toFloat (2 * yc)) 0)))) (List.range 0 (length - 1))

        roundPoint point =
            let
                x_ =
                    Quantity.toFloatQuantity (Quantity.round (Point3d.xCoordinate point))

                y_ =
                    Quantity.toFloatQuantity (Quantity.round (Point3d.yCoordinate point))

                z_ =
                    Quantity.toFloatQuantity (Quantity.round (Point3d.zCoordinate point))
            in
            Point3d.xyz x_ y_ z_

        entities =
            text3d str anchor scale { a = rot, b = 0, c = -90 }

        wall =
            List.map (\center -> buildColorBlock center Color.lightYellow Nothing R) coordinates
    in
    Text3d str anchor scale rot color coordinates entities wall ifWallInit


buildWall : GroundSize -> List Block
buildWall groundSize =
    let
        length =
            groundSize.l

        width =
            groundSize.w

        centers =
            List.map (\point -> Point3d.meters (toFloat (2 * point - 1)) (2 * length + 1) 1) (List.range (round -width) (round (width + 1)))
                ++ List.map (\point -> Point3d.meters (toFloat (2 * point - 1)) (-2 * length - 1) 1) (List.range (round -width) (round (width + 1)))
                ++ List.map (\point -> Point3d.meters (2 * width + 1) (toFloat (2 * point + 1)) 1) (List.range (round -length) (round (length - 1)))
                ++ List.map (\point -> Point3d.meters (-2 * width - 1) (toFloat (2 * point + 1)) 1) (List.range (round -length) (round (length - 1)))
    in
    List.map (\center -> buildColorBlock center Color.lightYellow Nothing R) centers


buildBlocks : List (Point3d Meters WorldCoordinates) -> List Color -> List (Maybe Event) -> List Direction -> List Block
buildBlocks pointList colorList eventList dirList =
    List.map4 buildColorBlock pointList colorList eventList dirList


buildBlock : Point3d Meters WorldCoordinates -> Block3d Meters WorldCoordinates
buildBlock center =
    let
        comp =
            Quantity.half blockLen

        vec =
            Vector3d.xyz comp comp comp

        v1 =
            center |> Point3d.translateBy vec

        v2 =
            center |> Point3d.translateBy (Vector3d.reverse vec)
    in
    Block3d.from v1 v2


buildColorBlock : Point3d Meters WorldCoordinates -> Color -> Maybe Event -> Direction -> Block
buildColorBlock center color event dir =
    let
        this =
            buildBlock center
    in
    Block this center color event dir


text3d :
    String
    -> Point3d Length.Meters WorldCoordinates
    -> Float
    -> { x | a : Float, b : Float, c : Float }
    -> Scene3d.Entity WorldCoordinates
text3d str anchor scale rot =
    let
        moveY dy entity =
            move 0 dy 0 entity

        text =
            List.map parser (str |> String.toList)

        combine head rest =
            Scene3d.group [ head, rest |> moveY (6 * len) ]

        dr =
            Vector3d.from Point3d.origin anchor
    in
    List.foldr combine sp text
        -- |> Scene3d.mirrorAcross Plane3d.xy
        |> Scene3d.scaleAbout Point3d.origin scale
        |> Scene3d.rotateAround Axis3d.z (Angle.degrees rot.a)
        |> Scene3d.rotateAround Axis3d.y (Angle.degrees rot.b)
        |> Scene3d.rotateAround Axis3d.x (Angle.degrees rot.c)
        |> Scene3d.translateBy dr


move : Float -> Float -> Float -> Scene3d.Entity WorldCoordinates -> Scene3d.Entity WorldCoordinates
move dx dy dz entity =
    entity
        |> Scene3d.translateIn Direction3d.positiveX (Length.meters dx)
        |> Scene3d.translateIn Direction3d.positiveY (Length.meters dy)
        |> Scene3d.translateIn Direction3d.positiveZ (Length.meters dz)
