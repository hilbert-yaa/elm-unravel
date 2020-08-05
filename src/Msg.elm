module Msg exposing (Msg(..))

--这个模块存放所有能看作是Msg的东西
--应避免引用Type之外的自定义module

import Duration exposing (Duration)
import Pixels exposing (Pixels)
import Quantity exposing (Quantity)
import Types exposing (Direction)
import Types exposing (SceneSettings)


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
