module Model exposing (..)

--Model模块，不多说，初始化的时候执行一次Resize
--数据类型还是用Quantity提供的吧，一来有例子，二来它兼容很多实用的方法，比如bound之类的。
--建议看下Elm-units这个package，了解基本的type和方法~
import Types exposing (..)
import Msg exposing (Msg(..))

import Angle exposing (Angle)
import Point3d exposing (Point3d,xCoordinate,yCoordinate,zCoordinate)
import Cylinder3d exposing (..)
import Length exposing (Meters)
import Axis3d exposing (Axis3d)
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Color exposing (Color)
import Quantity
import Block3d exposing (Block3d)
import Browser.Dom
import Color exposing (Color)
import Length
import Point3d exposing (Point3d, coordinates)
import Direction3d
import Sphere3d
import Vector3d



type alias Model =
    { time : Int
    , screen : ScreenSize
    , camera : CameraOpt
    , enableMouse : Bool
    , enableKey : Bool
    , playerRound : Bool
    , self : Block --需要完成的
    , actives : List Block
    , nactives : List Block
    , wall : List Block
    , cars : List Block
    , carPeriod : Int
    , event : Maybe Event --这个是全局的事件，比如镜头拉近、光线变化等
    , goal : Goal
    , level : Int
    , world : WorldType
    , gameStatus : GameStatus
    , groundSize : GroundSize
    , mapSize : GroundSize
    , godMode : Bool
    , text : Text
    , frameTime : Int
    , texts3d : List Text3d
    , texts3dRev : List Text3d
    , reverseTimer : Int
    , settings : Entity WorldCoordinates
    , scene : SceneSettings
    , level6Lock : Bool
    , level3Lock : Int -- Death time -1 means normal, >= 0 means R has not been used
    }
actives : List Block
actives =
    let
        p1 = Point3d.meters 5 -19 1
        blocks = List.map (\center -> buildColorBlock center Color.lightGray Nothing Up) []
    in
    blocks


nactives : List Block
nactives = 
    let 
        --blocks = List.map (\center -> buildColorBlock center Color.lightYellow Nothing R) [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13]
        blocks = []
    in
    blocks

texts3d : List Text3d
texts3d =
    -- 第二个参数为锚点，可以随意设置
    -- 第三个参数是锚点所在方块的中心，其未必与锚点重合，要设为奇数
    -- 第四个参数为scale 可随意
    -- 第五个参数为绕z轴旋转，仅支持90倍数
    -- 最后一个参数是初始时不显示时是否占据空间
        -- -1 -> text invisible, wall enabled
        -- -2 -> text invisible, wall disabled
    [
        buildText3d "unravel" (Point3d.meters -5 -3 1) (Point3d.meters -5 -3 1) 0.4 0 Color.white -1
        , buildText3d "group6" (Point3d.meters -1 -10 1) (Point3d.meters -1 -9 1) 0.1 0 Color.white -1
        , buildText3d "rc release" (Point3d.meters 1 -10 1) (Point3d.meters 1 -9 1) 0.1 0 Color.white -1
        , buildText3d "less" (Point3d.meters 5 12 1) (Point3d.meters 5 3 1) 0.4 -30 Color.white -1
    ]

texts3dRev : List Text3d
texts3dRev =
    [
        -- buildText3d "you need vg100" (Point3d.meters 7 -27 1) (Point3d.meters 7 -27 1) 0.2 90 Color.white -1
        -- , buildText3d "idiot" (Point3d.meters 1 -1 1) (Point3d.meters 1 -1 1) 0.3 -90 Color.white -1
    ]

initText : Text
initText = {content = "", top = 0, left = 0, opacity = 1, size = 0, event = {name = Types.Noop , init = 0 , duration = 0}}

settings : Entity WorldCoordinates
settings =
    let
        lamps = [ lamp (Point3d.meters 0 8 0) 270, lamp (Point3d.meters -3 -3 0) 45]
        text1 = text3d "play" (Point3d.meters 2 2 0.7) 0.4 { a = 0, b = 270, c = 0 }
        text2 = text3d "help" (Point3d.meters 6 2 0.7) 0.4 { a = 0, b = 270, c = 0 }
    in
    Scene3d.group
        <| lamps ++ [ text1, text2 ]

init : ( Model, Cmd Msg )
init =
    -- 方块的边长是2
    let
        initCenter = Point3d.meters -1 -1 1 --self初始位置
        initBlock = buildBlock initCenter
        -- initGoal = Point3d.meters 1 19 1
        initGoal = Point3d.meters 1 1 1
        groundSize = GroundSize 50 50 --地面边界
        mapSize = GroundSize 7 7 --地图边界（空气墙）
        -- initWall =  buildWall mapSize
        initWall =  buildWall mapSize  ++  List.map (\block -> moveBlock block) (buildWall (GroundSize 1 1 )) ++ [buildColorBlock (Point3d.meters -3 -3 1) Color.lightYellow Nothing R]
        moveBlock block =
            let
                newCenter = Point3d.translateBy ( Vector3d.meters 2 6 0 ) block.center
                newThis = buildBlock newCenter
            in
                { block | center = newCenter, this = newThis }
        initScene =
            { background = Color.white
            , renderOpt = 10
            , luminance = 5000
            }
    in
    ( { time = 0
      , screen = ScreenSize Quantity.zero Quantity.zero
      , camera = 
            { focalPoint = Point3d.meters 2 0 1
            , azimuth = Angle.degrees -20
            , elevation = Angle.degrees 50
            , distance = Length.meters 50
            }
      , enableMouse = False
      , enableKey = True
      , playerRound = True
      , self = Block initBlock initCenter Color.white Nothing R
      , actives = actives
      , nactives = nactives
      , cars = []
      , carPeriod = 50
      , wall = initWall
      , event = Nothing
      , goal = { center = initGoal }
      , level = 0
      , world = Normal
      , gameStatus = PreGame 1 600
      , groundSize = groundSize
      , mapSize = mapSize
      , godMode = False
      , text = initText
      , frameTime = 100
      , texts3d = texts3d
      , texts3dRev = texts3dRev
      , reverseTimer = 0
      , settings = settings
      , scene = initScene
      , level6Lock = False
      , level3Lock = -1
      }
    , Cmd.none
    )