port module Ports exposing (..)

port playSound : String -> Cmd msg

port onScroll : (Float -> msg) -> Sub msg 