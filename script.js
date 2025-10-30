const comments = []; 
let lookImages = [];
let currentIndex = 0;

// Display pages
function showSection(sectionId) {
    const sections = ['mainMenu', 'lookAround', 'memorabilia', 'search', 'postComment', 'update'];
    sections.forEach(id => document.getElementById(id).style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    document.getElementById('updateStep1').style.display = 'block';
    document.getElementById('updateStep2').style.display = 'none';
}

//  comment
document.getElementById('commentForm').addEventListener('submit', function(e){
    e.preventDefault();
    const commentText = document.getElementById('commentInput').value.trim();
    if(commentText){
        comments.push(commentText);
        document.getElementById('commentInput').value = '';
        displayComments();
    }
});

function displayComments(){
    const list = document.getElementById('commentList');
    list.innerHTML = '';
    comments.forEach(c => {
        const li = document.createElement('li');
        li.textContent = c;
        list.appendChild(li);
    });
}

// update
document.getElementById('updateForm1').addEventListener('submit', function(e){
    e.preventDefault();
    const selected = document.getElementById('typeSelect').value;
    if(selected){
        document.getElementById('updateStep1').style.display = 'none';
        document.getElementById('updateStep2').style.display = 'block';
    }
});

document.getElementById('updateForm2').addEventListener('submit', function(e){
    e.preventDefault();
    alert("Update Successful");
});

// Cancel / go back
function cancelUpdate(){
    document.getElementById('updateStep2').style.display = 'none';
    document.getElementById('updateStep1').style.display = 'block';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('address').value = '';
}

function loadLookImages() {
    const files = document.getElementById('lookFile').files;
    if(files.length === 0){
        alert("Please select images.");
        return;
    }
    lookImages = Array.from(files).map(file => URL.createObjectURL(file));
    currentIndex = 0;
    showCurrentImage();
}

function showCurrentImage() {
    const img = document.getElementById('currentImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if(lookImages.length === 0){
        img.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }

    img.src = lookImages[currentIndex];
    img.style.display = 'block';
    prevBtn.style.display = (currentIndex > 0) ? 'inline-block' : 'none';
    nextBtn.style.display = (currentIndex < lookImages.length -1) ? 'inline-block' : 'none';
}

function nextImage() {
    if(currentIndex < lookImages.length -1){
        currentIndex++;
        showCurrentImage();
    }
}

function prevImage() {
    if(currentIndex > 0){
        currentIndex--;
        showCurrentImage();
    }
}
