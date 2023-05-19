let modalQt = 1;

//Foi criada essa função para não ter que ficar digitando document.querySelector toda hora no código, então, quando eu precisar do document.querySelector eu uso a letra c
const c = (e)=>document.querySelector(e); //Função anônima

const cs = (e)=>document.querySelectorAll(e);


//Usado para mapear o json
pizzaJson.map((item, index)=>{
    //Clonando o item
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //Gerando um id para a pizza selecionada
    pizzaItem.setAttribute('data-key', index);

    //Preencher as informações em pizza item
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; //Fixando dois algarismos após a vírgula
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        //Prevenir o evento padrão, ou seja, quando clicar no botão, não vai recarregar a página.
        e.preventDefault();

        //comando usado para sair do elemento 'a' e ir para o elemento(class) .pizza-item. 
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); //O closest encontra o elemento mais próximo do link
        modalQt = 1;

        //Preenchendo dados do modal
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        //Reseta para sempre deixar o 'grande' selecionado quando fechar e abrir o modal novamente
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{

            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        
        //Setar o valor da quantidade de produtos sempre em 1 após fecharmos e abrirmos o modal
        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        //Foi usado a função abaixo para setar um intervalo de 200ms para ele colocar a opacidade como 0 e depois como 1, se não setarmos o intervalo, ele age de uma forma muito rápida, fazendo com que a transição não seja feita corretamente e dando a impressão que está setando apenas o 1 direto
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        },200)
    });

    c('.pizza-area').append(pizzaItem);
});

//Eventos do modal
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

//Botão para fechar o modal
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    modalQt--;
    c('.pizzaInfo--qt').innerHTML = modalQt;

    if(modalQt < 1){
        closeModal();
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{

    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        //o .target serve para selecionar o item que eu estou clicando
        //e.target.classList.add('selected');
        //Foi deixado de usar o .target porque quando clicava nas gramas, do lado do botão, o funcionamento quebrava e não era possível selecionar mais nenhum tamanho

        size.classList.add('selected');
    });
});
