module Level5.Model exposing (..)

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
import Model exposing (Model)
import Msg exposing (Msg(..))
import Pixels
import Point3d exposing (Point3d, coordinates, xCoordinate, yCoordinate, zCoordinate)
import Ports exposing (..)
import Quantity
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Sphere3d
import Task
import Types exposing (..)
import Vector3d


actives : List Block
actives =
    let
        p1 =
            Point3d.meters -13 -13 1

        p2 =
            Point3d.meters -7 -15 1

        p3 =
            Point3d.meters -1 -15 1

        p4 =
            Point3d.meters 5 -13 1

        p5 =
            Point3d.meters 19 -7 1

        p6 =
            Point3d.meters 19 -3 1

        p7 =
            Point3d.meters 5 15 1

        p8 =
            Point3d.meters 15 5 1

        p9 =
            Point3d.meters -3 19 1

        p10 =
            Point3d.meters -5 19 1

        p11 =
            Point3d.meters -7 19 1

        p12 =
            Point3d.meters -9 19 1

        p13 =
            Point3d.meters -11 19 1

        p14 =
            Point3d.meters -3 15 1

        p15 =
            Point3d.meters -5 15 1

        p16 =
            Point3d.meters -7 15 1

        p17 =
            Point3d.meters -9 15 1

        p18 =
            Point3d.meters -11 15 1

        blocks =
            List.map (\center -> buildColorBlock center Color.lightGray Nothing Up) [ p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18 ]
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


texts3d : List Text3d
texts3d =
    -- 第二个参数为锚点，可以随意设置
    -- 第三个参数是锚点所在方块的中心，其未必与锚点重合，要设为奇数
    -- 第四个参数为scale 可随意
    -- 第五个参数为绕z轴旋转，仅支持90倍数
    -- 最后一个参数是初始时不显示时是否占据空间
    -- -1 -> text invisible, wall enabled
    -- -2 -> text invisible, wall disabled
    [ buildText3d "no one will help me" (Point3d.meters -15 -9 1) (Point3d.meters -15 -9 1) 0.1 180 Color.white -1
    , buildText3d "they will think me of odd" (Point3d.meters 7 -9 1) (Point3d.meters 7 -9 1) 0.08 180 Color.white -1
    , buildText3d "i don't think they will accept me" (Point3d.meters 9 3 1) (Point3d.meters 9 3 1) 0.08 0 Color.white -1
    ]


texts3dRev : List Text3d
texts3dRev =
    [ buildText3d "maybe things aren't so bad" (Point3d.meters -5 -7 1) (Point3d.meters -5 -7 1) 0.09 180 Color.white -1
    , buildText3d "i can contact more with other people" (Point3d.meters 11 -5 1) (Point3d.meters 11 -5 1) 0.05 -90 Color.white -1
    , buildText3d "why don't have a try" (Point3d.meters 1 7 1) (Point3d.meters 1 7 1) 0.1 0 Color.white -1
    , buildText3d "so many people helped me" (Point3d.meters -15 9 1) (Point3d.meters -15 9 1) 0.1 0 Color.white -1
    ]


initText : Text
initText =
    { content = "", top = 0, left = 0, opacity = 1, size = 0, event = { name = Types.Noop, init = 0, duration = 0 } }


settings : Entity WorldCoordinates
settings =
    let
        lamps =
            [ lamp (Point3d.meters 20 20 0) 225
            , lamp (Point3d.meters 20 -20 0) 135
            , lamp (Point3d.meters -20 20 0) 315
            , lamp (Point3d.meters -20 -20 0) 45
            , lamp (Point3d.meters -6 -14 0) 270
            , lamp (Point3d.meters 10 -12 0) 270
            , lamp (Point3d.meters 16 0 0) 0
            , lamp (Point3d.meters 0 10 0) 90
            ]
    in
    Scene3d.group <|
        lamps


init : ( Model, Cmd Msg )
init =
    -- 方块的边长是2
    let
        initCenter =
            Point3d.meters -19 -19 1

        --self初始位置
        initBlock =
            buildBlock initCenter

        -- initGoal = Point3d.meters 1 19 1
        initGoal =
            Point3d.meters -19 19 1

        groundSize =
            GroundSize 50 50

        --地面边界
        mapSize =
            GroundSize 10 10

        --地图边界（空气墙）
        initWall =
            buildWall mapSize

        initScene =
            { background = Color.darkGrey
            , renderOpt = 20
            , luminance = 5000
            }
    in
    ( { time = 0
      , screen = ScreenSize Quantity.zero Quantity.zero
      , camera =
            { focalPoint = initCenter
            , azimuth = Angle.degrees 90
            , elevation = Angle.degrees 30
            , distance = playerCameraDistance
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
      , level = 5
      , world = Normal
      , gameStatus = PreGame 1 600
      , groundSize = groundSize
      , mapSize = mapSize
      , godMode = False
      , text = initText
      , frameTime = 0
      , texts3d = texts3d
      , texts3dRev = texts3dRev
      , reverseTimer = 0
      , settings = settings
      , scene = initScene
      , level6Lock = False
      , level3Lock = -1
      }
    , playSound "bgm_5"
    )


buildStore : Point -> List (Entity WorldCoordinates)
buildStore center =
    let
        block1 =
            Block3d.with
                { x1 = Length.meters (8 + center.x)
                , y1 = Length.meters (4 + center.y)
                , z1 = Length.meters (6 + center.z)
                , x2 = Length.meters (-8 + center.x)
                , y2 = Length.meters (-4 + center.y)
                , z2 = Length.meters (-6 + center.z)
                }
    in
    let
        blocks =
            List.map (\block -> Scene3d.blockWithShadow (Material.color Color.blue) block) [ block1 ]
    in
    List.foldr List.append [] [ blocks ]
