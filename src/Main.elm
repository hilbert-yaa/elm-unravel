module Main exposing (..)

--Main负责调用各个关卡的模块，先写单页的，暂时还用Browser.Element (TBD)
--因为咱们的import可能会非常多，建议如下标准：
--我们自定义的module的import放在上面，下面空一行
--然后再写外部包的import，这样能一眼看清dependency。
--然后下空两行，开始写正文
--看完麻烦再看一下Model模块里 对所用的数据类型的建议。

import Browser
import Html exposing (Html)
import Level1.Model -- debug
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

--之后可以改成Model.init 增加初始页
