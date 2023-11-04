module Level3.Model exposing (..)

--Model模块，不多说，初始化的时候执行一次Resize
--数据类型还是用Quantity提供的吧，一来有例子，二来它兼容很多实用的方法，比如bound之类的。
--建议看下Elm-units这个package，了解基本的type和方法~

import Angle exposing (Angle)
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d)
import Browser.Dom
import Color exposing (Color)
import Cylinder3d exposing (..)
import Direction3d
import Length exposing (Meters)
import Model exposing (GameState)
import Msg exposing (Msg(..))
import Pixels
import Point3d exposing (Point3d, coordinates, xCoordinate, yCoordinate, zCoordinate)
import Ports exposing (..)
import Quantity
import Random
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Sphere3d
import Task
import Types exposing (..)
import Vector3d



--初始化的所有参数在此输入


actives : List Block
actives =
    let
        p1 =
            Point3d.meters 5 -19 1

        p2 =
            Point3d.meters -5 -13 1

        p3 =
            Point3d.meters 3 -19 1

        p4 =
            Point3d.meters -5 13 1

        p5 =
            Point3d.meters -3 13 1

        p6 =
            Point3d.meters -1 13 1

        p7 =
            Point3d.meters -5 -5 1

        p8 =
            Point3d.meters 3 -7 1

        p9 =
            Point3d.meters -3 -13 1

        p10 =
            Point3d.meters 5 1 1

        p11 =
            Point3d.meters 3 1 1

        p12 =
            Point3d.meters -5 7 1

        p13 =
            Point3d.meters 5 19 1

        blocks =
            List.map (\center -> buildColorBlock center Color.lightGray Nothing Up) []
    in
    blocks


nactives : List Block
nactives =
    let
        --blocks = List.map (\center -> buildColorBlock center Color.lightYellow Nothing R) [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13]
        blocks =
            []
    in
    blocks


cars : List Block
cars =
    let
        --blocks = List.map (\center -> buildColorBlock center Color.lightYellow Nothing R) [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13]
        blocks =
            []
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
    [ buildText3d "help me out" (Point3d.meters -11 -5 1) (Point3d.meters -11 -5 1) 0.15 0 Color.white -1
    , buildText3d "is this a nightmare?" (Point3d.meters 11 7 1) (Point3d.meters 11 7 1) 0.13 180 Color.white -1
    , buildText3d "stop" (Point3d.meters 4 7 1) (Point3d.meters 5 7 1) 0.15 -90 Color.white -1
    , buildText3d "they hate you" (Point3d.meters -10 7 1) (Point3d.meters -9 7 1) 0.15 -90 Color.white -1
    , buildText3d "idiot" (Point3d.meters -1 -7 1) (Point3d.meters -1 -7 1) 0.15 90 Color.white -1
    , buildText3d "why" (Point3d.meters 5 -7 1) (Point3d.meters 5 -7 1) 0.15 90 Color.white -1
    ]


texts3dRev : List Text3d
texts3dRev =
    [ buildText3d "i think i can do it" (Point3d.meters -11 -11 1) (Point3d.meters -11 -11 1) 0.2 0 Color.white -1
    ]


initText : Text
initText =
    { content = "", top = 0, left = 0, opacity = 1, size = 0, event = { name = Types.Noop, init = 0, duration = 0 } }


settings : Entity WorldCoordinates
settings =
    let
        lamps =
            [ lamp (Point3d.meters 6 7 0) 90
            , lamp (Point3d.meters 6 -7 0) -90
            , lamp (Point3d.meters -6 7 0) 90
            , lamp (Point3d.meters -6 -7 0) -90
            , lamp (Point3d.meters 6 17 0) -90
            , lamp (Point3d.meters 6 -17 0) 90
            , lamp (Point3d.meters -6 17 0) -90
            , lamp (Point3d.meters -6 -17 0) 90
            ]

        roads =
            [ road (Point3d.meters 10 7.6 0) (Point3d.meters -10 10.4 0.01) (Color.rgb255 30 30 30)
            , road (Point3d.meters 10 13.6 0) (Point3d.meters -10 16.4 0.01) (Color.rgb255 30 30 30)
            , road (Point3d.meters 10 -7.6 0) (Point3d.meters -10 -10.4 0.01) (Color.rgb255 30 30 30)
            , road (Point3d.meters 10 -13.6 0) (Point3d.meters -10 -16.4 0.01) (Color.rgb255 30 30 30)
            , road (Point3d.meters 2 7.9 0.01) (Point3d.meters -2 8.5 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 9.1 0.01) (Point3d.meters -2 9.7 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 10.3 0.01) (Point3d.meters -2 10.9 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 11.5 0.01) (Point3d.meters -2 12.1 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 12.7 0.01) (Point3d.meters -2 13.3 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 13.9 0.01) (Point3d.meters -2 14.5 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 15.1 0.01) (Point3d.meters -2 15.7 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 -7.9 0.01) (Point3d.meters -2 -8.5 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 -9.1 0.01) (Point3d.meters -2 -9.7 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 -10.3 0.01) (Point3d.meters -2 -10.9 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 -11.5 0.01) (Point3d.meters -2 -12.1 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 -12.7 0.01) (Point3d.meters -2 -13.3 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 -13.9 0.01) (Point3d.meters -2 -14.5 0.02) (Color.rgb255 255 255 255)
            , road (Point3d.meters 2 -15.1 0.01) (Point3d.meters -2 -15.7 0.02) (Color.rgb255 255 255 255)
            ]
    in
    Scene3d.group <|
        lamps
            ++ roads


init : ( GameState, Cmd Msg )
init =
    -- 方块的边长是2
    let
        initCenter =
            Point3d.meters 1 -1 1

        initBlock =
            buildBlock initCenter

        initGoal =
            Point3d.meters 1 19 1

        groundSize =
            GroundSize 50 50

        --地面边界
        mapSize =
            GroundSize 10 5

        --地图边界（空气墙）
        initWall =
            buildWall mapSize

        initScene =
            { background = Color.rgb255 50 50 50
            , renderOpt = 20
            , luminance = 5000
            }
    in
    ( { time = 0
      , screen = ScreenSize Quantity.zero Quantity.zero
      , camera =
            { focalPoint = initCenter
            , azimuth = Quantity.zero
            , elevation = Angle.degrees 30
            , distance = Length.meters 30
            }
      , enableMouse = False
      , enableKey = True
      , playerRound = True
      , self = Block initBlock initCenter Color.white Nothing R
      , actives = actives
      , nactives = nactives
      , wall = initWall
      , cars = cars
      , carPeriod = 60
      , event = Nothing
      , goal = { center = initGoal }
      , level = 3
      , world = Normal
      , gameStatus = PreGame 1 600
      , groundSize = groundSize
      , godMode = False
      , text = initText
      , frameTime = 0
      , texts3d = texts3d
      , mapSize = mapSize
      , texts3dRev = texts3dRev
      , reverseTimer = 0
      , settings = settings
      , scene = initScene
      , level6Lock = False
      , level3Lock = 0
      }
    , playSound "bgm_3"
    )
