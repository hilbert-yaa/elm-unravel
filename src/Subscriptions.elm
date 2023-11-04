module Subscriptions exposing (subscriptions)

import Browser.Events exposing (..)
import Duration
import Json.Decode as Decode exposing (Decoder)
import Model exposing (GameState)
import Msg exposing (Msg(..))
import Pixels exposing (Pixels)
import Ports exposing (onScroll)
import Types exposing (Direction(..), EventType(..), WorldType(..))


subscriptions : GameState -> Sub Msg
subscriptions model =
    Sub.batch
        [ onAnimationFrameDelta (Duration.milliseconds >> Tick)
        , onResize (\w h -> Resize (Pixels.int w) (Pixels.int h))
        , onScroll Scroll
        , if model.enableMouse then
            Sub.batch
                [ Browser.Events.onMouseMove mouseDecoder
                , Browser.Events.onMouseUp (Decode.succeed MouseUp)
                ]

          else
            Browser.Events.onMouseDown (Decode.succeed MouseDown)
        , if model.enableKey then
            Browser.Events.onKeyDown keyDecoder1

          else
            Browser.Events.onKeyUp (Decode.succeed KeyUp)
        ]


mouseDecoder : Decoder Msg
mouseDecoder =
    Decode.map2 MouseMove
        (Decode.field "movementX" (Decode.map Pixels.float Decode.float))
        (Decode.field "movementY" (Decode.map Pixels.float Decode.float))


keyDecoder1 : Decoder Msg
keyDecoder1 =
    Decode.field "key" Decode.string
        |> Decode.andThen keyMapping1


keyMapping1 : String -> Decode.Decoder Msg
keyMapping1 raw =
    case raw of
        "ArrowLeft" ->
            Decode.succeed (KeyDown Left)

        "ArrowRight" ->
            Decode.succeed (KeyDown Right)

        "ArrowUp" ->
            Decode.succeed (KeyDown Up)

        "ArrowDown" ->
            Decode.succeed (KeyDown Down)

        "A" ->
            Decode.succeed (KeyDown Left)

        "D" ->
            Decode.succeed (KeyDown Right)

        "W" ->
            Decode.succeed (KeyDown Up)

        "S" ->
            Decode.succeed (KeyDown Down)

        "a" ->
            Decode.succeed (KeyDown Left)

        "d" ->
            Decode.succeed (KeyDown Right)

        "w" ->
            Decode.succeed (KeyDown Up)

        "s" ->
            Decode.succeed (KeyDown Down)

        "r" ->
            Decode.succeed (KeyDown R)

        "R" ->
            Decode.succeed (KeyDown R)

        "g" ->
            Decode.succeed (KeyDown G)

        "G" ->
            Decode.succeed (KeyDown G)

        "Esc" ->
            Decode.succeed (Pause True)

        "Escape" ->
            Decode.succeed (Pause True)

        "=" ->
            Decode.succeed (Switch 1)

        _ ->
            Decode.fail "????"
