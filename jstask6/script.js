function GetData(link){
    fetch(link)
    .then(res => res.json())
    .then(data => {
        let html = '';
        data.forEach(item => {
            pr_title = item.title.length > 30 ? item.title.slice(0, 35)+'...' : item.title
            pr_desc = item.description.length > 100 ? item.description.slice(0, 100)+'...' : item.description
            html += `
            <div class="col-lg-3 mt-3">
                <div class="card">
                    <img src=${item.image} class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${pr_title}</h5>
                        <p class="card-text">${pr_desc}</p>
                        <div>
                            <p><span class="${item.rating.rate >= 4.5 ? 'text-success' : item.rating.rate >= 3.5 ? 'text-warning' : 'text-danger'}">
                                    ${item.rating.rate >= 4.5 ? 'Yüksək reytinq : ' : item.rating.rate >= 3.5 ? 'Orta reytinq :' : 'Pis reytinq : ' }
                                </span> ${item.rating.rate}/${item.rating.count}</p>
                        </div>
                        <div>
                            <a onclick="event.preventDefault()" style="width: 79%" href="#" class="btn btn-primary">Buy now $${item.price}</a>
                            <a onclick="DeleteItem(${item.id}, this, event)" style="width: 19%" href="#" class="btn btn-danger delete"><i class="fa-solid fa-trash-can"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            `
        });
        document.querySelector('#Content .container .row').innerHTML = html;
        let dltbuttons = document.querySelectorAll('.delete');
        for (const btn of dltbuttons) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                let parentCard = this.parentElement.parentElement.parentElement.parentElement;
                parentCard.remove();
            })
        }
    })
}

GetData('https://fakestoreapi.com/products');



fetch('https://fakestoreapi.com/products/categories')
.then(res => res.json())
.then(data => {
    let categ = '';
    if (data.length == 0) {
        let notfound = document.querySelector('#NotFound');
        let content = document.querySelector('#Content');
        notfound.classList.remove('d-none');
        content.classList.add('d-none');
    }else{
        data.forEach(item => {
            categ += `
            <a href="#">${item}</a>
            `
        })
        document.querySelector('#myDropdown').innerHTML = categ;
        let ctgbuttons = document.querySelectorAll('#myDropdown a');
    
        for (const btn of ctgbuttons) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                GetData(`https://fakestoreapi.com/products/category/${this.innerHTML}`)
            })
        }
    }
    
})

function togglecategory() {
    document.getElementById("myDropdown").classList.toggle("show");
}


let inp = document.querySelector('#sortinp');
inp.addEventListener('keyup', function(){
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
        let html = '';
        data = data.filter(x => x.title.toLowerCase().startsWith(inp.value.toLowerCase()));
        let notfound = document.querySelector('#NotFound');
        let content = document.querySelector('#Content');
        if (data.length === 0) {
            notfound.classList.remove('d-none');
            content.classList.add('d-none');
        }else{
            notfound.classList.add('d-none');
            content.classList.remove('d-none');
            data.forEach(item => {
                pr_title = item.title.length > 30 ? item.title.slice(0, 35)+'...' : item.title
                pr_desc = item.description.length > 100 ? item.description.slice(0, 100)+'...' : item.description
                html += `
                <div class="col-lg-3 mt-3">
                <div class="card">
                    <img src=${item.image} class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${pr_title}</h5>
                        <p class="card-text">${pr_desc}</p>
                        <div>
                            <p><span class="${item.rating.rate >= 4.5 ? 'text-success' : item.rating.rate >= 3.5 ? 'text-warning' : 'text-danger'}">
                                    ${item.rating.rate >= 4.5 ? 'Yüksək reytinq : ' : item.rating.rate >= 3.5 ? 'Orta reytinq :' : 'Pis reytinq : ' }
                                </span> ${item.rating.rate}/${item.rating.count}</p>
                        </div>
                        <div>
                            <a onclick="event.preventDefault()" style="width: 79%" href="#" class="btn btn-primary">Buy now $${item.price}</a>
                            <a onclick="DeleteItem(${item.id}, this, event)" style="width: 19%" href="#" class="btn btn-danger delete"><i class="fa-solid fa-trash-can"></i></a>
                        </div>
                    </div>
                </div>
            </div>
                `
            });
            document.querySelector('#Content .container .row').innerHTML = html;
        } 
    })
})


function DeleteItem(id, item, event){
    event.preventDefault();
    let parentCard = item.parentElement.parentElement.parentElement.parentElement;
    parentCard.remove();
    fetch(`https://fakestoreapi.com/products/${id}`,{
         method:"DELETE"
    })
    .then(res=>res.json())
    .then(json=>console.log(json))

    let toast = document.querySelector('#Toast');
    toast.style.right = '20px'
    setTimeout(() => {
        toast.style.right = '-500px'
    }, 1500);

    if (document.querySelector('#Content .container .row').innerHTML.trim() == '') {
        let notfound = document.querySelector('#NotFound');
        let content = document.querySelector('#Content');
        notfound.classList.remove('d-none');
        content.classList.add('d-none');
    }
}






