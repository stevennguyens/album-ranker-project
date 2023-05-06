import "./RankListCard.scss";

const RankListImage = ({items}) => {
    let imageArr = [items[0].image];
    for (const i in items) {
        if (!imageArr.includes(items[i].image)) {
            imageArr.push(items[i].image)
        }
        if (imageArr.length >= 4) {
            break
        }
    }

    return (
        <div className={(imageArr.length < 4) ? "img-div" : "img-grid"}>
            {(imageArr.length < 4) ?
            <img src={items[0].image}></img>
            :
            items.map((item, i) => {
                return(
                    <img key={i} src={item.image}></img>
                )
            })}
        </div>
    )
}

export default RankListImage