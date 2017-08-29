var version = '1.0.0';

(function() {

    /**
     * Load Highlight
     */
    hljs.initHighlightingOnLoad();

    /**
     * Load Source Code
     */
    function loadSourceCode(file) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                if (xmlhttp.status == 200) {
                    document.getElementById('source-code-' + file).innerHTML = xmlhttp.responseText;

                    hljs.highlightBlock(document.getElementById('source-code-' + file));
                }
                else {
                    document.getElementById('source-code-' + file).parentNode.innerHTML = 'Error loading source code, <a href="easy-modal/easy-modal-' + version + '.' + file + '" title="Click here to open" target="_blank">click here</a> to open.';
                }
            }
        };

        xmlhttp.open('GET', 'easy-modal/easy-modal-' + version + '.' + file, true);
        xmlhttp.send();
    }
    loadSourceCode('js');
    loadSourceCode('css');

    openModal();

})();

/**
 * Example
 */
function openModal() {

    var modal = new easyModal({
        'title': 'Teste'
    });

    modal.open();
}

/**
 * Log
 */
function l(x) {
    console.log(x);
}