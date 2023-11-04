module Main exposing (..)

-- debug

import Browser
import Model exposing (GameState)
import Msg exposing (Msg(..))
import Subscriptions exposing (subscriptions)
import Types exposing (GamePhase(..))
import Update exposing (update)
import View exposing (view)


main : Program () GameState Msg
main =
    Browser.element
        { init = \_ -> init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init : ( GameState, Cmd Msg )
init =
    Model.init
