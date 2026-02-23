{
    function pass(times){
        const elements = document.querySelectorAll("embed-same-context")
        let number_of_elements = elements.length

        for(let counter = 0; number_of_elements > counter; counter++){
            const embed_same_context_elem = elements[counter]

            const ref = embed_same_context_elem.getAttribute("src")
            fetch(new Request(ref))
                .then((response) => response.text())
                .then((contents) => {
                    embed_same_context_elem.innerHTML = contents
                    embed_same_context_elem.setAttribute("loaded", true)
                })
        }
        if(document.getElementsByTagName("embed-same-context").length > 0 && times > 0){
            pass(times - 1)
        }
    }
    pass(1)
}