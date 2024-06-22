export const pagenation = (page,limit)=>{
    if(!page || page <= 0){
        page = 1;
    }
    if(!limit || limit <= 0){
        limit = 2;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);

    return {skip, limit};
}