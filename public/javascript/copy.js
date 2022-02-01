for (let copyId of copyIds) {
    document.getElementById(copyId).addEventListener("click", function() {
        const btn = document.getElementById(copyId)
        navigator.clipboard.writeText(document.getElementById(copyId+'Text').innerHTML);

        const clipboardIcon = 
        '<i class="bi bi-clipboard-check"></i>'
        btn.innerHTML = clipboardIcon;
        btn.classList.add('btn-copy-success');
        btn.classList.remove('btn-copy');
        setTimeout(() => {
            btn.classList.remove('btn-copy-success');
            btn.classList.add('btn-copy');
            btn.innerHTML = '<i class="bi bi-clipboard"></i>';
        }, 5000);


    });
}
