const FetchTodosFactory = (request) => {
    const authorId = "1NNaN64427926 47";
    
    return () => {
        return [
            {
                id: 1554992827197,
                task: "Do laundry",
                deadline: 1554992305797,
                authorId
            },
            {
                id: 1554992897197,
                task: "Go foodshopping",
                deadline: 1554992302797,
                authorId
            },
            {
                id: 1554992807197,
                task: "Finish assignment",
                deadline: 1554992365797,
                authorId
            }
        ]
    };
}

export default FetchTodosFactory;
