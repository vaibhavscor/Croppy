
// getting all fields value 

console.log('hello world')
const alertBox = document.getElementById('alert-box')
const imageBox = document.getElementById('image-box')
const imageForm = document.getElementById('image-form')
const confirmBtn = document.getElementById('confirm-btn')



console.log(imageForm)

const input = document.getElementById('id_file')

const csrf = document.getElementsByName('csrfmiddlewaretoken')

// input is a field to accetpt the image it is hidden 

input.addEventListener('change', ()=>{
    alertBox.innerHTML = ""
    confirmBtn.classList.remove('not-visible')

    const img_data = input.files[0]

    // image url 
    const url = URL.createObjectURL(img_data)

    // JSX 
        
    imageBox.innerHTML = `<img src="${url}" id="image" width="700px">`
    

    var $image = $('#image')
    console.log($image)
    $image.cropper({
        aspectRatio: 16 / 9,
        crop: function(event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
        }
    });
    
    //  confirm button 

    var cropper = $image.data('cropper');

    confirmBtn.addEventListener('click', ()=>{

        cropper.getCroppedCanvas().toBlob((blob) => {
            console.log('confirmed')
            const fd = new FormData();

            //  updating 


            fd.append('csrfmiddlewaretoken', csrf[0].value)
            fd.append('file', blob, 'my-image.png');


            //  updating and performing ajax

            $.ajax({
                type:'POST',
                url: imageForm.action,
                enctype: 'multipart/form-data',
                data: fd,

                // handling success

                success: function(response){
                    console.log('success', response)
                    alertBox.innerHTML = `<div class="alert alert-success" role="alert">
                                            Successfully saved and cropped the selected image
                                        </div>`
                },


                // handling error 


                error: function(error){
                    console.log('error', error)
                    alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                                            Something went wrong
                                        </div>`
                },
                cache: false,
                contentType: false,
                processData: false,
            })
        })
    })
})