module Level4.Model exposing (..)

--Model模块，不多说，初始化的时候执行一次Resize
--数据类型还是用Quantity提供的吧，一来有例子，二来它兼容很多实用的方法，比如bound之类的。
--建议看下Elm-units这个package，了解基本的type和方法~

import Msg exposing (Msg(..))
import Types exposing (..)
import Model exposing (Model)
import Ports exposing (..)

import Angle exposing (Angle)
import Point3d exposing (Point3d,xCoordinate,yCoordinate,zCoordinate)
import Cylinder3d exposing (..)
import Length exposing (Meters)
import Axis3d exposing (Axis3d)
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Color exposing (Color)
import Block3d exposing (Block3d)
import Browser.Dom
import Color exposing (Color)
import Length
import Pixels
import Point3d exposing (Point3d, coordinates)
import Quantity
import Random
import Point3d exposing (coordinates)
import Direction3d
import Sphere3d
import Task
import Vector3d
import Level2.Model exposing (texts3d)
import Level2.Model exposing (texts3dRev)

--初始化的所有参数在此输入

actives : List Block
actives =
    let
        blocks = List.map (\center -> buildColorBlock center Color.lightGray Nothing Up) []
    in
    blocks


nactives : List Block
nactives = 
    let 
        maze_ = maze
        --blocks = List.map (\center -> buildColorBlock center Color.lightYellow Nothing R) [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13]
        blocks = maze_
    in
    blocks

maze : List Block
maze =
    let
        l1 = buildBrick "ver" 13 -1 3 
        l2 = buildBrick "hor" 17 -1 27  
        l3 = buildBrick "hor" 6 17 23  
        l4 = buildBrick "hor" 5 23 19  
        l5 = buildBrick "hor" 5 23 13  
        l6 = buildBrick "hor" 10 13 7  
        l7 = buildBrick "hor" 14 5 3  
        l8 = buildBrick "hor" 7 5 13 
        l9 = buildBrick "hor" 2 15 17  
        l10 = buildBrick "hor" 3 1 17  
        l11 = buildBrick "hor" 2 3 21  
        l12 = buildBrick "hor" 2 3 23
        l13 = buildBrick "hor" 1 23 21
        l14 = buildBrick "ver" 6 5 3
        l15 = buildBrick "ver" 5 13 13
        l16 = buildBrick "hor" 3 -1 1
    in
        [l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,l16]
        

buildLine : String -> Int -> Int -> Int -> List Block
buildLine dir num x y =
     let
        blocks =
            case dir of
                "hor" -> List.map (\point->Point3d.meters (toFloat (x+2*point-2)) (toFloat y) 1) (List.range 1 num)
                "ver" -> List.map (\point->Point3d.meters (toFloat x) (toFloat (y+2*point-2)) 1) (List.range 1 num)
                _ -> []
    in
        List.map (\center -> buildColorBlock center Color.black Nothing R) blocks

buildBrick : String -> Int -> Int -> Int -> Block
buildBrick dir num x y =
    let
        comp = 1 --quantity 写起来手感不好，如果之后出问题了我立马改呜呜呜呜

        vec = 
            case dir of
                "hor" -> Vector3d.fromMeters 
                            {x = comp*(toFloat num)
                            ,y = comp 
                            ,z = comp}
                "ver" -> Vector3d.fromMeters 
                            {x = comp 
                            ,y = comp*(toFloat num)
                            ,z = comp}
                _ -> Vector3d.zero

        center_x =
            case dir of
                "hor" -> x + comp*num - 1
                "ver" -> x
                _ -> 0
        center_y =
            case dir of
                "hor" -> y
                "ver" -> y + comp*num - 1
                _ -> 0

        center = Point3d.meters (toFloat center_x) (toFloat center_y) 1

        v1 =
            center |> Point3d.translateBy vec

        v2 =
            center |> Point3d.translateBy (Vector3d.reverse vec)
        in
        let
            this = Block3d.from v1 v2
            color = Color.darkCharcoal
            event = Nothing
            dir_ = R
        in
            Block this center color event dir_

initText : Text
initText = {content = "", top = 0, left = 0, opacity = 1, size = 0, event = {name = Types.Noop , init = 0 , duration = 0}}

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
        buildText3d "stop" (Point3d.meters 7 17 1) (Point3d.meters 7 17 1) 0.2 -90 Color.white -1
        , buildText3d "you don't deserve" (Point3d.meters 11 25 1) (Point3d.meters 11 25 1) 0.07 180 Color.white -1
        , buildText3d "you'll be hurt" (Point3d.meters 33 27 1) (Point3d.meters 33 25 1) 0.07 180 Color.white -1
        , buildText3d "protect yourself" (Point3d.meters 33 19 1) (Point3d.meters 33 19 1) 0.06 180 Color.white -1
        , buildText3d "please not " (Point3d.meters 33 11 1) (Point3d.meters 33 11 1) 0.06 180 Color.white -1
        , buildText3d "stop" (Point3d.meters 17 9 1) (Point3d.meters 17 9 1) 0.1 0 Color.white -1
        , buildText3d "i beg you" (Point3d.meters 11 7 1) (Point3d.meters 11 7 1) 0.08 90 Color.white -1
        , buildText3d "you'll die" (Point3d.meters 33 7 1) (Point3d.meters 33 7 1) 0.06 180 Color.white -1
        , buildText3d "i can give you my loneliness," (Point3d.meters 37 13 1) (Point3d.meters 37 13 1) 0.06 180 Color.white -1
        , buildText3d "my darkness," (Point3d.meters 41 3 1) (Point3d.meters 41 3 1) 0.06 180 Color.white -1
        , buildText3d "the hunger of my heart," (Point3d.meters 45 13 1) (Point3d.meters 45 13 1) 0.06 180 Color.white -1
        , buildText3d "i am trying to bribe you with uncertainty," (Point3d.meters 49 3 1) (Point3d.meters 49 3 1) 0.06 180 Color.white -1
        , buildText3d "with danger, with defeat." (Point3d.meters 53 15 1) (Point3d.meters 53 15 1) 0.06 180 Color.white -1
    ]

texts3dRev : List Text3d
texts3dRev =
    -- 第二个参数为锚点，可以随意设置
    -- 第三个参数是锚点所在方块的中心，其未必与锚点重合，要设为奇数
    -- 第四个参数为scale 可随意
    -- 第五个参数为绕z轴旋转，仅支持90倍数
    -- 最后一个参数是初始时不显示时是否占据空间
        -- -1 -> text invisible, wall enabled
        -- -2 -> text invisible, wall disabled
    [
        buildText3d "you can" (Point3d.meters 7 23 1) (Point3d.meters 7 23 1) 0.15 -90 Color.white -1
        , buildText3d "try" (Point3d.meters 5 25 1) (Point3d.meters 5 25 1) 0.06 180 Color.white -1
        , buildText3d "just have a try" (Point3d.meters 33 27 1) (Point3d.meters 33 27 1) 0.07 180 Color.white -1
        , buildText3d "It won't hurt much " (Point3d.meters 33 19 1) (Point3d.meters 33 19 1) 0.06 180 Color.white -1
        , buildText3d "break it " (Point3d.meters 33 11 1) (Point3d.meters 33 11 1) 0.06 180 Color.white -1
        , buildText3d "try it" (Point3d.meters 13 9 1) (Point3d.meters 13 9 1) 0.06 0 Color.white -1
        , buildText3d "try" (Point3d.meters 17 6 1) (Point3d.meters 17 5 1) 0.07 180 Color.white -1
        , buildText3d "i can give you my loneliness," (Point3d.meters 37 13 1) (Point3d.meters 37 13 1) 0.06 180 Color.white -1
        , buildText3d "my darkness," (Point3d.meters 41 3 1) (Point3d.meters 41 3 1) 0.06 180 Color.white -1
        , buildText3d "the hunger of my heart," (Point3d.meters 45 13 1) (Point3d.meters 45 13 1) 0.06 180 Color.white -1
        , buildText3d "i am trying to bribe you with uncertainty," (Point3d.meters 49 3 1) (Point3d.meters 49 3 1) 0.06 180 Color.white -1
        , buildText3d "with danger, with defeat." (Point3d.meters 53 15 1) (Point3d.meters 53 15 1) 0.06 180 Color.white -1
    ]


initWall_4 : List Block
initWall_4 =
    let
        l17 = buildLine "hor" 14 33 -1
        l18 = buildLine "hor" 14 33 7
        l19 = buildLine "ver" 5 61 -1
        l20 = buildLine "ver" 1 31 1
        l1 = buildLine "ver" 13 -1 3 
        l2 = buildLine "hor" 17 -1 27  
        l3 = buildLine "hor" 6 17 23  
        l4 = buildLine "hor" 5 23 19  
        l5 = buildLine "hor" 5 23 13  
        l6 = buildLine "hor" 10 13 7  
        l7 = buildLine "hor" 14 5 3  
        l8 = buildLine "hor" 7 5 13 
        l9 = buildLine "hor" 2 15 17  
        l10 = buildLine "hor" 3 1 17  
        l11 = buildLine "hor" 2 3 21  
        l12 = buildLine "hor" 2 3 23
        l13 = buildLine "hor" 1 23 21
        l14 = buildLine "ver" 6 5 3
        l15 = buildLine "ver" 5 13 13
        l16 = buildLine "hor" 3 -1 1
    in
        List.concat [l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,l16,l17,l18,l19,l20]

settings : Entity WorldCoordinates
settings = 
    let 
        lamp_ = [lamp (Point3d.meters 63 5 0) 180]
        boy = [Scene3d.blockWithShadow (Material.color Color.white) (buildBlock (Point3d.meters 61 5 1))]
    in
        Scene3d.group
            <| lamp_ ++ boy
init : ( Model, Cmd Msg )
init =
    --整个场景是20*40的，然后方块的边长是2
    let
        initCenter = Point3d.meters 1 3 1 
        -- initCenter = Point3d.meters 57 5 1
        
        initBlock = buildBlock initCenter
        initGoal = Point3d.meters 59 5 1
        groundSize = GroundSize 100 100 --地面边界
        mapSize = GroundSize 50 50 --地图边界（空气墙）
        initScene =
            { background = Color.white
            , renderOpt = 20
            , luminance = 5000
            }
    in
    ( { time = 0
      , screen = ScreenSize Quantity.zero Quantity.zero
      , camera = 
            { focalPoint = initCenter
            , azimuth = Angle.degrees -90
            , elevation = Angle.degrees 30
            , distance = playerCameraDistance 
            }
      , enableMouse = False
      , enableKey = True
      , playerRound = True
      , self = Block initBlock initCenter Color.white Nothing R
      , actives = actives
      , nactives = nactives
      , wall = initWall_4
      , cars = []
      , carPeriod = 100
      , event = Nothing
      , goal = { center = initGoal }
      , level = 4
      , world = Normal
      , gameStatus = PreGame 1 600 --600
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
      , level3Lock = -1
      }
    , playSound "bgm_4"
    )
