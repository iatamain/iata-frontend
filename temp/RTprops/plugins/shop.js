const imgBtn = document.querySelectorAll(".pictures__item-btn");

imgBtn.forEach(function(item){
    item.addEventListener("click", function(){
        let currentImg = item;

        imgBtn.forEach(function(item){
            item.classList.remove('active')
        });
        currentImg.classList.add('active');
        modal.open()
    });
});
const modal = $.modal({
    title: 'Product',
    closable: true,
    content: `
    <h4>The confirmation of buyng</h4>
    <p>Are you shure about that?!</p>`,
    width: '400px',
    footerButtons:[
        {text: "Buy", type: 'primary', handler(){          
            console.log('Primary btn clicked')
            modal.setContent('Confirmed')
            setTimeout(modal.close, 500)
        }},
        {text: "Cancel", type: 'danger', handler(){
            console.log('danger btn clicked')
            modal.close()
        }}
    ]
});