module Level1.Model exposing (..)

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
import Level4.Model exposing (buildLine)
import Model exposing (GameState)
import Msg exposing (Msg(..))
import Parameter1d
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



--初始化的所有参数在此输入


actives : List Block
actives =
    let
        p1 =
            Point3d.meters -3 -15 1

        p2 =
            Point3d.meters 5 -9 1

        p3 =
            Point3d.meters -5 -1 1

        p4 =
            Point3d.meters -3 1 1

        p5 =
            Point3d.meters 1 -3 1

        p6 =
            Point3d.meters -3 -5 1

        p7 =
            Point3d.meters 1 11 1

        p8 =
            Point3d.meters -3 31 1

        p9 =
            Point3d.meters -3 13 1

        p10 =
            Point3d.meters 3 13 1

        p11 =
            Point3d.meters 3 1 1

        p12 =
            Point3d.meters 1 7 1

        p13 =
            Point3d.meters 7 15 1

        p14 =
            Point3d.meters 1 25 1

        p15 =
            Point3d.meters 3 33 1

        blocksG =
            List.map (\center -> buildColorBlock center (Color.rgb255 172 215 216) Nothing G) [ p1, p2, p3, p4, p15 ]

        blocksClock =
            List.map (\center -> buildColorBlock center (Color.rgb255 172 215 216) Nothing Clock) [ p5, p6, p7 ]

        blocksLeft =
            List.map (\center -> buildColorBlock center (Color.rgb255 139 198 198) Nothing Left) [ p8, p9, p13 ]

        blocksUp =
            List.map (\center -> buildColorBlock center (Color.rgb255 187 231 231) Nothing Up) [ p10, p12, p14 ]

        blocks =
            blocksG ++ blocksLeft ++ blocksClock ++ blocksUp
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
    [ buildText3d "you need food" (Point3d.meters -25 -36 1) (Point3d.meters -25 -35 1) 0.2 0 Color.white -1
    , buildText3d "nobody hurts" (Point3d.meters -8 -37 1) (Point3d.meters -9 -37 1) 0.2 90 Color.white -1
    , buildText3d "coward?" (Point3d.meters 6 -37 1) (Point3d.meters 5 -37 1) 0.3 90 Color.white -1
    , buildText3d "you see it" (Point3d.meters 9 -23 1) (Point3d.meters 9 -23 1) 0.2 180 Color.white -1
    , buildText3d "they don't bite" (Point3d.meters 9 -1 1) (Point3d.meters 9 -1 1) 0.2 180 Color.white -1
    , buildText3d "you are dying" (Point3d.meters -9 1 1) (Point3d.meters -9 1 1) 0.2 0 Color.white -1
    , buildText3d "you have to" (Point3d.meters -9 -16 1) (Point3d.meters -9 -17 1) 0.2 0 Color.white -1
    , buildText3d "almost" (Point3d.meters -9 22 1) (Point3d.meters -9 21 1) 0.2 0 Color.white -1
    , buildText3d "be brave" (Point3d.meters 9 14 1) (Point3d.meters 9 13 1) 0.2 180 Color.white -1
    , buildText3d "away!" (Point3d.meters -5 -17 1) (Point3d.meters -5 -17 1) 0.2 -90 Color.white -1
    , buildText3d "stranger" (Point3d.meters -2 -11 1) (Point3d.meters -1 -11 1) 0.2 -90 Color.white -1
    , buildText3d "leave me alone" (Point3d.meters -5 6 1) (Point3d.meters -5 7 1) 0.2 0 Color.white -1
    , buildText3d "nearly" (Point3d.meters 9 31 1) (Point3d.meters 9 31 1) 0.2 180 Color.white -1
    ]


texts3dRev : List Text3d
texts3dRev =
    [-- buildText3d "you need vg100" (Point3d.meters 7 -27 1) (Point3d.meters 7 -27 1) 0.2 90 Color.white -1
     -- , buildText3d "idiot" (Point3d.meters 1 -1 1) (Point3d.meters 1 -1 1) 0.3 -90 Color.white -1
    ]


initText : Text
initText =
    { content = "", top = 0, left = 0, opacity = 1, size = 0, event = { name = Types.Noop, init = 0, duration = 0 } }


settings : Entity WorldCoordinates
settings =
    let
        lamps =
            [ lamp (Point3d.meters -8 -20 0) 0
            , lamp (Point3d.meters -8 0 0) 0
            , lamp (Point3d.meters -8 20 0) 0
            , lamp (Point3d.meters 8 -20 0) 180
            , lamp (Point3d.meters 8 0 0) 180
            , lamp (Point3d.meters 8 20 0) 180
            , lamp (Point3d.meters 8 -40 0) 180
            , lamp (Point3d.meters -8 -40 0) 0
            , lamp (Point3d.meters 8 -60 0) 180
            , lamp (Point3d.meters -8 -60 0) 0
            ]

        store_center = Point3d.meters 0 40 0
        store =
            buildStore store_center

        text1 =
            text3d "store" (Point3d.meters -3.5 33.3 5) 0.25 { a = 270, b = 0, c = 0 }

        tallWall =
            Scene3d.blockWithShadow (Material.color Color.black) (Block3d.from (Point3d.meters -44 -20 0) (Point3d.meters -8 -19 8))

        -- shade = [
        --     Scene3d.quad (Material.color Color.black) (Point3d.meters 0.1 -7.01 4) (Point3d.meters 0.1 -7.01 5.2) (Point3d.meters -0.1 -7.01 5.2) (Point3d.meters -0.1 -7.01 4)
        --     , Scene3d.block (Material.color Color.black) (Block3d.from (Point3d.meters 1 -7.5 4) (Point3d.meters -1 -7.01 5.2))
        --     , Scene3d.quad (Material.color Color.black) (Point3d.meters 0.1 -7.1 4.8) (Point3d.meters 0.1 -7.1 5.2) (Point3d.meters -0.1 -7.1 5.2) (Point3d.meters -0.1 -7.1 4.8)
        --     , Scene3d.quad (Material.color Color.black) (Point3d.meters 0.1 -7.1 4.8) (Point3d.meters 0.1 -7.1 5.2) (Point3d.meters -0.1 -7.1 5.2) (Point3d.meters -0.1 -7.1 4.8)
        --     ]
    in
    Scene3d.group <|
        store
            ++ lamps
            ++ [ text1, tallWall ]



--++shade


boundary : List Block
boundary =
    let
        l1 =
            buildLine "hor" 9 -25 -19

        l2 =
            buildLine "hor" 17 -25 -37

        l3 =
            buildLine "hor" 1 9 -35

        l4 =
            buildLine "ver" 2 9 -21

        l5 =
            buildLine "ver" 2 -9 -3

        l6 =
            buildLine "ver" 2 -9 17

        l7 =
            buildLine "ver" 3 -9 29

        l8 =
            buildLine "ver" 2 9 1

        l9 =
            buildLine "ver" 4 9 17

        l10 =
            buildLine "ver" 1 9 33

        l11 =
            buildLine "hor" 3 3 35

        l12 =
            buildLine "hor" 3 -7 35
    in
    List.concat [ l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12 ]


init : ( GameState, Cmd Msg )
init =
    -- 方块的边长是2
    let
        initCenter =
            Point3d.meters -19 -29 1

        --self初始位置 -19 -29 1
        initBlock =
            buildBlock initCenter

        -- initGoal = Point3d.meters 5 31 1
        initGoal =
            Point3d.meters 1 33 1

        groundSize =
            GroundSize 50 50

        --地面边界
        mapSize =
            GroundSize 20 15

        --地图边界（空气墙）
        initWall =
            boundary

        initScene =
            { background = Color.rgb255 10 10 10
            , renderOpt = 20
            , luminance = 5000
            }
    in
    ( { time = 0
      , screen = ScreenSize Quantity.zero Quantity.zero
      , camera =
            { focalPoint = initCenter
            , azimuth = Angle.degrees 0
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
      , level = 1
      , world = Normal
      , gamePhase = PreGame 1 600 --600
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
    , playSound "bgm_1"
    )


buildStore : Point3d Meters WorldCoordinates -> List (Entity WorldCoordinates)
buildStore center =
    let
        x = Point3d.xCoordinate center |> Length.inMeters

        y = Point3d.yCoordinate center |> Length.inMeters

        z = Point3d.zCoordinate center |> Length.inMeters

        block1 =
            Block3d.from (Point3d.meters (x - 10) (y - 6) (z + 7)) (Point3d.meters (x + 10) (y + 6) (z + 8))

        block2 =
            Block3d.from (Point3d.meters (x - 10) (y - 6) z) (Point3d.meters (x - 2) (y - 4) (z + 8))

        block3 =
            Block3d.from (Point3d.meters (x + 10) (y - 6) z) (Point3d.meters (x + 2) (y - 4) (z + 8))

        block4 =
            Block3d.from (Point3d.meters (x - 2) (y - 6) (z + 4)) (Point3d.meters (x + 2) (y - 4) (z + 8))

        block5 =
            Block3d.from (Point3d.meters (x - 10) (y + 6) z) (Point3d.meters (x + 10) (y + 8) (z + 8))

        block6 =
            Block3d.from (Point3d.meters (x - 10) (y - 6) z) (Point3d.meters (x - 8) (y + 6) (z + 8))

        block7 =
            Block3d.from (Point3d.meters (x + 8) (y - 6) z) (Point3d.meters (x + 10) (y + 8) (z + 8))
    in
    let
        blocks =
            List.map (\block -> Scene3d.blockWithShadow (Material.matte Color.gray) block) [ block1, block2, block3, block4, block5, block6, block7 ]
    in
    List.foldr List.append [] [ blocks ]
