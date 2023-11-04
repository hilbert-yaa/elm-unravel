module Msg exposing (Msg(..))

import Duration exposing (Duration)
import Pixels exposing (Pixels)
import Quantity exposing (Quantity)
import Types exposing (Direction)


type Msg
    = Resize (Quantity Int Pixels) (Quantity Int Pixels)
    | Scroll Float
    | Tick Duration
    | MouseUp
    | MouseDown
    | MouseMove (Quantity Float Pixels) (Quantity Float Pixels)
    | KeyDown Direction
    | Pause Bool
    | Option String
    | Switch Int
    | KeyUp
    | Noop
