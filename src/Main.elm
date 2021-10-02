module Main exposing (..)

-- debug

import Browser
import Html exposing (Html)
import Level1.Model
import Level2.Model
import Level3.Model
import Level4.Model
import Level5.Model
import Level6.Model
import Model exposing (Model)
import Msg exposing (Msg(..))
import Subscriptions exposing (subscriptions)
import Types exposing (GameStatus(..))
import Update exposing (update)
import View exposing (view)


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Msg )
init =
    Model.init
