import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import 'react-horizontal-scrolling-menu/dist/styles.css';
import "./style.css";
import { Post } from "../../utils/types/Post";
import Card from "../Card/Card";

type ArrowProps = {
    children: React.ReactNode
    handleClick: VoidFunction,
    className: string
}

function Arrow({children, handleClick, className}:ArrowProps){
    return (
        <>
            <button style={{ fontSize: "30px" }} onClick={handleClick} className={className}>
                {children}
            </button>
        </>
    )
}

function LeftArrow(){
    const { scrollPrev } = useContext(VisibilityContext);
    const direction = "<";

    return (
        <Arrow  handleClick={() => scrollPrev()} className="arrow-prev">
            {direction}
        </Arrow>
    )
}

function RightArrow(){
    const { scrollNext } = useContext(VisibilityContext);
    const direction = ">";

    return (
        <Arrow handleClick={() => scrollNext()} className="arrow-next">
            {direction}
        </Arrow>
    )
}

type Props = {
    posts: Post[]
}

export default function CustomScrollMenu({posts}:Props){
    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} Footer={"none"}>
            {posts ? (
                posts.map((post) => (
                    <Card post={post} key={post.id} />
                ))
            ): (
                <span>O usuário não fez nenhum post</span>
            )}
        </ScrollMenu>
    )
}