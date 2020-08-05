module Event exposing (..)

import Axis3d exposing (Axis3d)
import Block3d
import Direction3d exposing (Direction3d)
import Length exposing (Length)
import Point3d
import Angle
import Quantity
import Types exposing (Block, Direction(..), Event, EventType(..), blockLen, buildBlock, rotateRate)
import Vector3d exposing (Vector3d)



--下面的都用不到-------------------------------------


append : Event -> List Event -> List Event
append item list =
    item :: list


gcollect :
    (Event -> Bool)
    -> List Event
    -> List Event --检测timeout
gcollect fun list =
    List.filter fun list



--上面的都用不到--------------------------------------
{- 给方块添加一个Event -}


keyToEvent : Direction -> Int -> Block -> Block
keyToEvent key time block =
    --给方块添加一个Event
    case block.event of
        Nothing ->
            --这里可以根据key的新功能用case of添加其他可能性，目前只有rotate
            let
                newEvent =
                    Event (Rotate key) time 15

                --发现event的initial似乎没什么用诶。。。我傻了orz
                newBlock =
                    { block | dirBefore = key, event = Just newEvent }
            in
            { newBlock | event = Just newEvent }

        _ ->
            block



--如果已经有任务了就保持不变


updateEvent :
    Int
    -> Event
    -> Maybe Event --负责检测过期并删除Event
updateEvent time event =
    case event.name of
        _ ->
            --通常情况：检测过期并删除
            let
                remainTime =
                    event.init + event.duration - time
            in
            if remainTime <= 0 then
                Nothing

            else
                Just event


rotateBlock : Int -> Event -> Block -> Block
rotateBlock time event block =
    case event.name of
        Rotate dir ->
            let
                ifEnd =
                    if event.init + event.duration - time == 0 then
                        True

                    else
                        False

                -- 旋转结束了吗
            in
            if ifEnd then
                block |> stampBlock dir
                --移动方块的体心

            else
                let
                    angle =
                        rotateRate

                    halfLen =
                        Quantity.half blockLen

                    axisHelper =
                        \x y -> Axis3d.through y x

                    axis =
                        case dir of
                            Up ->
                                axisHelper Direction3d.negativeY
                                    (block.center |> Point3d.translateBy (Vector3d.xyz (halfLen |> Quantity.multiplyBy -1) halfLen (halfLen |> Quantity.multiplyBy -1)))

                            Down ->
                                axisHelper Direction3d.y
                                    (block.center |> Point3d.translateBy (Vector3d.xyz halfLen halfLen (halfLen |> Quantity.multiplyBy -1)))

                            Left ->
                                axisHelper Direction3d.x
                                    (block.center |> Point3d.translateBy (Vector3d.xyz halfLen (halfLen |> Quantity.multiplyBy -1) (halfLen |> Quantity.multiplyBy -1)))

                            Right ->
                                axisHelper Direction3d.negativeX
                                    (block.center |> Point3d.translateBy (Vector3d.xyz (halfLen |> Quantity.multiplyBy -1) halfLen (halfLen |> Quantity.multiplyBy -1)))

                            _ ->
                                Axis3d.withDirection Direction3d.positiveZ block.center
                    newCube =
                        if dir == CounterClock then
                            block.this |> Block3d.rotateAround axis (Angle.degrees -6)
                        else 
                            block.this |> Block3d.rotateAround axis angle
                in
                    if dir == R then
                        block
                    else
                        { block | this = newCube }

        _ ->
            block


stampBlock : Direction -> Block -> Block
stampBlock dir block =
    let
        dis =
            case dir of
                Up ->
                    Vector3d.withLength blockLen Direction3d.negativeX

                Down ->
                    Vector3d.withLength blockLen Direction3d.positiveX

                Left ->
                    Vector3d.withLength blockLen Direction3d.negativeY

                _ ->
                    Vector3d.withLength blockLen Direction3d.positiveY

        newCenter =
            block.center |> Point3d.translateBy dis

        newSelf =
            buildBlock newCenter
    in
    if dir == R || dir == Clock || dir == CounterClock then
        block

    else
        { block | this = newSelf, center = newCenter }
