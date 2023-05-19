import "./RankListCard.scss";

const RankListImage = ({items}) => {
    if (items && items.length) {
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
            <div className={(imageArr.length < 4) ? "ranklist-image img-div" : "ranklist-image img-grid"}>
                {(imageArr.length < 4) ?
                <img src={items[0].image}></img>
                :
                imageArr.map((image, i) => {
                    return(
                        <img key={i} src={image}></img>
                    )
                })}
            </div>
        )} else {
            return (
                <div className="ranklist-image empty-img"/>
            )
    }
}

export default RankListImage