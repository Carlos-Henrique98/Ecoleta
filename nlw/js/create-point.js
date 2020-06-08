function populatedUFs(){
    const ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
    
    for( const state of states){
        ufSelect.innerHTML = ufSelect.innerHTML + `<option value = "${state.id}">${state.nome}</option>`
    }
    
    })
}

populatedUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then(res => res.json())
    .then(cities => {

    for( const city of cities){
        citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
    }
        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf")
.addEventListener("change", getCities)

//items de coleta
  const itemsToCollect = document.querySelectorAll(".items-grid li")

  for(const item of itemsToCollect){
      item.addEventListener("click", handleSelectedItem)
  }

    const collectedItems = document.querySelector("input[name=items]")

  let selectItems = [2,3]

  function handleSelectedItem(event){
      const itemLi = event.target
      itemLi.classList.toggle("selected")
      const itemId = itemLi.target.dataset.id
     
    const alreadySelected = selectItems.findIndex(item => {
        const itemFound = item === itemId
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{
        selectItems.push(itemId)
    }

    collectedItems.value = selectItems    
  }