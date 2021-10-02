module Text3d exposing (..)

import Block3d
import Color exposing (Color)
import Point3d
import Scene3d
import Scene3d.Material as Material


len =
    1


bd : Float -> Float -> Scene3d.Entity a
bd x_ y_ =
    build (x_ - 1) (y_ - 1) len 1 1


bdh : Float -> Float -> Float -> Scene3d.Entity a
bdh x_ y_ l_ =
    build (x_ - 1) (y_ - 1) len l_ 1


bdv : Float -> Float -> Float -> Scene3d.Entity a
bdv x_ y_ l_ =
    build (x_ - 1) (y_ - 1) len 1 l_


build : Float -> Float -> Float -> Float -> Float -> Scene3d.Entity a
build x_ y_ l_ w_ h_ =
    let
        p1 =
            Point3d.meters 0 (x_ * l_) (y_ * l_)

        p2 =
            Point3d.meters 1 ((x_ + w_) * l_) ((y_ + h_) * l_)

        block =
            Block3d.from p1 p2
    in
    Scene3d.block (Material.color Color.white) block


a =
    Scene3d.group
        [ bdv 1 1 6
        , bd 2 7
        , bd 3 7
        , bd 4 7
        , bdv 5 1 6
        , bdh 2 4 3
        ]


b =
    Scene3d.group
        [ bdv 1 1 7
        , bdh 2 7 3
        , bd 5 6
        , bd 5 5
        , bd 5 3
        , bd 5 2
        , bdh 2 4 3
        , bdh 2 1 3
        ]


c =
    Scene3d.group
        [ bdv 1 2 5
        , bdh 2 7 3
        , bd 5 6
        , bd 5 2
        , bdh 2 1 3
        ]


d =
    Scene3d.group
        [ bdv 1 1 7
        , bdh 2 7 3
        , bdv 5 4 3
        , bdv 5 2 2
        , bdh 2 1 3
        ]


e =
    Scene3d.group
        [ bdv 1 1 7
        , bdh 2 7 4
        , bd 5 1
        , bdh 2 4 3
        , bdh 2 1 3
        ]


f =
    Scene3d.group
        [ bdv 1 1 7
        , bdh 2 7 3
        , bd 5 7
        , bdh 2 4 3
        ]


g =
    Scene3d.group
        [ bdv 1 2 5
        , bdh 2 7 3
        , bd 5 6
        , bd 5 2
        , bdh 2 1 3
        , bdh 3 3 3
        ]


h =
    Scene3d.group
        [ bdv 1 1 7
        , bdv 5 1 7
        , bdh 2 4 3
        ]


i =
    Scene3d.group
        [ bdv 3 2 5
        , bdh 1 7 5
        , bdh 1 1 5
        ]


j =
    Scene3d.group
        [ bdv 1 2 2
        , bdh 3 7 3
        , bdv 5 2 5
        , bdh 2 1 3
        ]


k =
    Scene3d.group
        [ bdv 1 1 7
        , bd 5 7
        , bd 5 1
        , bd 4 6
        , bd 4 2
        , bd 3 3
        , bd 3 5
        , bd 2 4
        ]


l =
    Scene3d.group
        [ bdv 1 1 7
        , bdh 2 1 4
        ]


m =
    Scene3d.group
        [ bdv 1 1 7
        , bdv 5 1 7
        , bd 2 5
        , bdv 3 3 2
        , bd 4 5
        ]


n =
    Scene3d.group
        [ bdv 1 1 7
        , bdv 5 1 7
        , bd 2 5
        , bd 3 4
        , bd 4 3
        ]


o =
    Scene3d.group
        [ bdv 1 2 5
        , bdh 2 7 3
        , bdv 5 2 5
        , bdh 2 1 3
        ]


p =
    Scene3d.group
        [ bdv 1 1 7
        , bdh 2 7 3
        , bdv 5 5 2
        , bdh 2 4 3
        ]


q =
    Scene3d.group
        [ bdv 1 2 5
        , bdh 2 7 3
        , bdv 5 2 5
        , bdh 2 1 4
        , bd 4 2
        ]


r =
    Scene3d.group
        [ bdv 1 1 7
        , bdh 2 7 3
        , bdv 5 5 2
        , bdv 3 3 2
        , bd 4 2
        , bd 5 1
        , bd 2 4
        , bd 4 4
        ]


s =
    Scene3d.group
        [ bd 1 2
        , bd 1 5
        , bd 1 6
        , bdh 2 7 3
        , bd 5 6
        , bdv 5 2 2
        , bdh 2 4 3
        , bdh 2 1 3
        ]


t =
    Scene3d.group
        [ bdv 3 1 6
        , bdh 1 7 5
        ]


u =
    Scene3d.group
        [ bdv 1 2 6
        , bdv 5 2 6
        , bdh 2 1 3
        ]


v =
    Scene3d.group
        [ bd 2 2
        , bdv 1 3 5
        , bdv 5 3 5
        , bd 4 2
        , bd 3 1
        ]


w =
    Scene3d.group
        [ bdv 1 2 6
        , bdv 5 2 6
        , bdv 3 2 2
        , bd 2 1
        , bd 4 1
        ]


x =
    Scene3d.group
        [ bd 1 1
        , bd 2 2
        , bd 3 3
        , bd 4 2
        , bd 5 1
        , bd 3 4
        , bd 3 5
        , bd 2 6
        , bd 4 6
        , bd 1 7
        , bd 5 7
        ]


y =
    Scene3d.group
        [ bdv 3 1 5
        , bd 2 6
        , bd 4 6
        , bd 1 7
        , bd 5 7
        ]


z =
    Scene3d.group
        [ bdh 1 1 5
        , bd 1 2
        , bd 2 3
        , bd 3 4
        , bd 4 5
        , bd 5 6
        , bdh 1 7 5
        ]


n4 =
    Scene3d.group
        [ bd 1 3
        , bd 1 4
        , bd 2 5
        , bd 3 6
        , bd 4 7
        , bdv 5 1 7
        , bd 2 3
        , bd 3 3
        , bd 4 3
        ]


n1 =
    Scene3d.group
        [ bd 3 2
        , bd 3 3
        , bd 3 4
        , bd 3 5
        , bd 3 6
        , bd 1 5
        , bd 2 6
        , bd 3 7
        , bd 5 1
        , bd 2 1
        , bd 3 1
        , bd 4 1
        , bd 1 1
        ]


n3 =
    Scene3d.group
        [ bd 1 2
        , bd 1 6
        , bd 2 7
        , bd 3 7
        , bd 4 7
        , bd 5 6
        , bd 5 5
        , bd 5 3
        , bd 5 2
        , bd 3 4
        , bd 4 4
        , bd 2 1
        , bd 3 1
        , bd 4 1
        ]


n9 =
    Scene3d.group
        [ bd 1 5
        , bd 1 6
        , bd 2 7
        , bd 3 7
        , bd 4 7
        , bd 5 6
        , bd 5 5
        , bd 5 4
        , bd 5 3
        , bd 5 2
        , bd 2 4
        , bd 3 4
        , bd 4 4
        , bd 2 1
        , bd 3 1
        , bd 4 1
        ]


n7 =
    Scene3d.group
        [ bd 1 6
        , bd 1 7
        , bd 2 7
        , bd 3 7
        , bd 4 7
        , bd 5 7
        , bd 5 6
        , bd 5 5
        , bd 4 4
        , bd 3 2
        , bd 3 1
        , bd 3 3
        ]


n0 =
    Scene3d.group
        [ bd 1 2
        , bd 1 3
        , bd 1 4
        , bd 1 5
        , bd 1 6
        , bd 2 7
        , bd 3 7
        , bd 4 7
        , bd 5 6
        , bd 5 5
        , bd 5 4
        , bd 5 3
        , bd 5 2
        , bd 2 1
        , bd 3 1
        , bd 4 1
        , bd 2 3
        , bd 3 4
        , bd 4 5
        ]


n2 =
    Scene3d.group
        [ bd 1 1
        , bd 1 2
        , bd 1 3
        , bd 1 6
        , bd 2 7
        , bd 3 7
        , bd 4 7
        , bd 5 6
        , bd 5 5
        , bd 5 1
        , bd 2 4
        , bd 3 4
        , bd 4 4
        , bd 2 1
        , bd 3 1
        , bd 4 1
        ]


n6 =
    Scene3d.group
        [ bd 1 2
        , bd 1 3
        , bd 1 4
        , bd 1 5
        , bd 1 6
        , bd 2 7
        , bd 3 7
        , bd 4 7
        , bd 5 3
        , bd 5 2
        , bd 2 4
        , bd 3 4
        , bd 4 4
        , bd 2 1
        , bd 3 1
        , bd 4 1
        ]


n5 =
    Scene3d.group
        [ bd 1 1
        , bd 1 4
        , bd 1 5
        , bd 1 6
        , bd 1 7
        , bd 2 7
        , bd 3 7
        , bd 4 7
        , bd 5 7
        , bd 5 3
        , bd 5 2
        , bd 2 4
        , bd 3 4
        , bd 4 4
        , bd 2 1
        , bd 3 1
        , bd 4 1
        ]


n8 =
    Scene3d.group
        [ bd 1 2
        , bd 1 3
        , bd 1 5
        , bd 1 6
        , bd 2 7
        , bd 3 7
        , bd 4 7
        , bd 5 6
        , bd 5 5
        , bd 5 3
        , bd 5 2
        , bd 2 4
        , bd 3 4
        , bd 4 4
        , bd 2 1
        , bd 3 1
        , bd 4 1
        ]


pr =
    Scene3d.group
        [ bd 2 7
        , bd 2 6
        , bd 2 5
        ]


cm =
    Scene3d.group
        [ bd 2 2
        , bd 3 1
        ]


qm =
    Scene3d.group
        [ bd 3 3
        , bd 3 1
        , bd 4 4
        , bd 5 5
        , bd 5 6
        , bd 4 7
        , bd 3 7
        , bd 2 7
        , bd 1 6
        ]


sp =
    Scene3d.group []



-- parser : Char -> Scene3d.Entity WorldCoordinates


parser ch =
    case ch of
        'a' ->
            a

        'b' ->
            b

        'c' ->
            c

        'd' ->
            d

        'e' ->
            e

        'f' ->
            f

        'g' ->
            g

        'h' ->
            h

        'i' ->
            i

        'j' ->
            j

        'k' ->
            k

        'l' ->
            l

        'm' ->
            m

        'n' ->
            n

        'o' ->
            o

        'p' ->
            p

        'q' ->
            q

        'r' ->
            r

        's' ->
            s

        't' ->
            t

        'u' ->
            u

        'v' ->
            v

        'w' ->
            w

        'x' ->
            x

        'y' ->
            y

        'z' ->
            z

        '0' ->
            n0

        '1' ->
            n1

        '2' ->
            n2

        '3' ->
            n3

        '4' ->
            n4

        '5' ->
            n5

        '6' ->
            n6

        '7' ->
            n7

        '8' ->
            n8

        '9' ->
            n9

        '\'' ->
            pr

        ',' ->
            cm

        '?' ->
            qm

        _ ->
            sp
