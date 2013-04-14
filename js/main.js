(function() {

    var template1 = document.getElementById('template1'),
        template2 = document.getElementById('template2'),
        container = document.getElementById('container'),
        classes1 = ['default', 'slide-up', 'spin', 'slide-left', 'slide-right', 'fade', 'flip', 'edge-flip'],
        classes2 = ['slide-right-fade'],
        clone;

    for (var i = 0; i < classes1.length; i++) {
        container.appendChild(clone(template1, classes1[i]));
    }

    for (var i = 0; i < classes2.length; i++) {
        container.appendChild(clone(template2, classes2[i]));
    }

    function clone(template, className) {
        var clone = template.cloneNode(true);
        clone.removeAttribute('id');
        clone.children[0].className += ' ' + className;
        clone.insertBefore(transitionTitle(className), clone.firstChild);
        return clone;
    }

    // Toggle the 'toggle' class on the navbar-container div
    var buttons = document.querySelectorAll('.button');
    Array.prototype.forEach.call(buttons, clickHandler);

    /**
    * Adds a click handler to the specified button to toggle the
    * 'toggle' class name on the navbar-container div.
    */
    function clickHandler(btn) {
        btn.addEventListener('click', onClick, false);
        btn.addEventListener('touchend', onClick, true);

        function onClick(e) {
            var containerDiv = findParent(btn, 'navbar-container'),
                curClassName = containerDiv.className;

            containerDiv.className = curClassName.indexOf('toggle') === -1 
                    ? curClassName + ' toggle'
                    : curClassName.replace(' toggle', '');

            e && e.preventDefault();
        }

        btn.parentNode.addEventListener('webkitTransitionEnd', onTransitionEnd, false);
        btn.parentNode.parentNode.addEventListener('webkitTransitionEnd', onTransitionEnd, false);

        /**
        * Focusses on the search input field when relevant.
        */
        function onTransitionEnd(e) {
            var parentNode = e.target.parentNode;
            if (parentNode.className.indexOf('toggle') !== -1
                    || e.target.className.indexOf('toggle') !== -1) {
                findParent(btn, 'navbar-container').lastElementChild.firstElementChild.focus();
            }
        }

    }

    /**
    * Returns the title for the transition inside a h1 element.
    */
    function transitionTitle(transitionName) {
       var el = document.createElement('h1');
       el.innerText = '.' + transitionName;
       return el;
    }

    /**
    * Returns the parent of the given element in the hierarchy with the
    * given className, or null if it can't be found.
    */
    function findParent(el, className) {
      while (el.parentNode 
          && el.parentNode.className.indexOf(className) === -1) {
        el = el.parentNode;
      }
      return el.parentNode;
    }

})();