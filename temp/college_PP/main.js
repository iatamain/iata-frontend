function submit() {
    var prtContent = document.getElementById("print");
    var WinPrint = window.open();
    WinPrint.document.body.appendChild(prtContent);
      
    
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
}