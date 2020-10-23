(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    class FormHandler {
        constructor(selector) {
            if (!selector) {
                throw new Error('No selector provided');
            }

            this.$formElement = $(selector);
            if (this.$formElement.length === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
        }

        addSubmitHandler(fn, page) {
            this.$formElement.on('submit', function (event) {
                event.preventDefault();
                console.log('Setting submit handler for form');

                var data = {};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });

                var baseModal = document.querySelector('.modal');
                
                if (baseModal) {
                    var modal = $('#ex1');
                    
                    var thank = 'Thank you for your order';
                    if (data['title']) {
                        thank += ' ' + data['title'];
                    }

                    if (data['username']) {
                        thank += ' ' + data['username'];
                    }

                    modal.html('<p>'+thank+'</p><a href="#" rel="modal:close">Close</a>');
                    modal.show();

                    baseModal.addEventListener('click', function () {
                        modal.hide();
                    });
                }

                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
            });
        }

        addInputHandler = function (fn) {
            console.log('Setting input handler for form');
            this.$formElement.on('input', '[name="emailAddress"]', function (event) {
                var emailAddress = event.target.value;
                var message = '';
                if (fn(emailAddress)) {
                    event.target.setCustomValidity('');
                } else {
                    message = emailAddress + ' is not an authorized email address!'
                    event.target.setCustomValidity(message);
                }
            });
        };
    }

    App.FormHandler = FormHandler;
    window.App = App;

}) (window);