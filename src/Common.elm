module Common exposing (..)

noCmd : a -> ( a, Cmd msg )
noCmd model =
    ( model, Cmd.none )
