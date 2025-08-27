Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

// animation 
const animationItems = document.querySelectorAll('.animation-item');
if (animationItems.length > 0) {
    function onEntry(e) {
        e.forEach(e => {
            e.isIntersecting && e.target.classList.add("animation-active")
        }
        )
    }
    let options = {
        threshold: [.5]
    }, observer = new IntersectionObserver(onEntry, options)
    for (let e of animationItems)
        observer.observe(e);
}
// end animation

let scrollWidthFunc = () => {
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    document.querySelector('html').style.paddingRight = scrollWidth + 'px';
    document.querySelector('header').style.paddingRight = scrollWidth + 'px';
}
const scrollTop = document.querySelector('.scroll-top');
if (scrollTop)
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


/* hide header */
// ['load', 'resize'].forEach((event) => {
//     window.addEventListener(event, function () {
//         let headerHeight = header.clientHeight;
//         const plashka = header.querySelector('.header__plashka');
//         const headerTop = header.querySelector('.header__top');
//         if (plashka) {
//             var originalHeightPlashka = plashka.offsetHeight;
//             var originalHeightHeaderTop = headerTop.offsetHeight;
//         }
//         window.onscroll = function (e) {
//             if (window.scrollY > headerHeight) {
//                 if (!plashka.classList.contains('hide')) {
//                     plashka.classList.add('hide');
//                     plashka.style.height = '0px';
//                     plashka.style.opacity = '0';
//                     plashka.style.overflow = 'hidden';

//                     if(window.innerWidth > 1260) {
//                         headerTop.classList.add('hide');
//                         headerTop.style.height = '0px';
//                         headerTop.style.opacity = '0';
//                         headerTop.style.overflow = 'hidden';
//                     }
//                 }
//             }
//             else {
//                 plashka.style.height = originalHeightPlashka + 'px';
//                 plashka.classList.remove('hide');
//                 plashka.style.opacity = '1';

//                 headerTop.style.height = originalHeightHeaderTop + 'px';
//                 headerTop.classList.remove('hide');
//                 headerTop.style.opacity = '1';
//                 headerTop.style.overflow = 'visible';
//             }
//         };
//     })
// })
/* hide header */


document.addEventListener("DOMContentLoaded", function () {
    /* burger menu */
    const burgerMenu = document.querySelector('.burger__menu');
    if (burgerMenu) {
        const headerMobile = document.querySelector('.header__menu');
        const header = document.querySelector('.header');
        const plashka = document.querySelector('.header__plashka');
        burgerMenu.addEventListener("click", () => {
            if (burgerMenu.classList.contains('burger__menu--active')) {
                if (plashka) {
                    plashka.style.display = 'block';
                }
                document.body.classList.remove('burger-lock');
            }
            else {
                if (plashka) {
                    plashka.style.display = 'none';
                }
                document.body.classList.add('burger-lock');
            }
            headerMobile.classList.toggle("header__menu--active");
            burgerMenu.classList.toggle("burger__menu--active");
            header.classList.toggle("header--active");

            document.querySelector('html').classList.toggle('burger-lock');
        });
    }
    /* end burger menu */


    // Popups
    function popupClose(popupActive) {
        popupActive.classList.remove('open');
        setTimeout(() => {
            if (!popupActive.classList.contains('open')) {
                popupActive.classList.remove('active');
            }
        }, 400);
        document.body.classList.remove('lock');
        document.querySelector('html').style.paddingRight = 0;
        document.querySelector('html').classList.remove('lock');
        document.querySelector('header').removeAttribute('style');


    }
    const popupOpenBtns = document.querySelectorAll('.popup-btn');
    const popups = document.querySelectorAll('.popup');
    const originalTitlePopup2 = document.querySelector('.original-title').innerHTML;
    const closePopupBtns = document.querySelectorAll('.close-popup-btn');
    closePopupBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            popupClose(e.target.closest('.popup'));
        });
    });
    popupOpenBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            const path = e.currentTarget.dataset.path;
            const currentPopup = document.querySelector(`[data-target="${path}"]`);
            if (currentPopup) {
                popups.forEach(function (popup) {
                    popupClose(popup);
                    popup.addEventListener('click', function (e) {
                        if (!e.target.closest('.popup__content')) {
                            popupClose(e.target.closest('.popup'));
                        }
                    });
                });
                currentPopup.classList.add('active');
                setTimeout(() => {
                    currentPopup.classList.add('open');
                }, 10);
                if (currentPopup.getAttribute('data-target') == 'popup-change') {

                    let originaTitle = currentPopup.querySelector('.original-title');
                    if (el.classList.contains('change-item__btn')) {

                        if (el.classList.contains('doctor__btn-js')) {
                            let currentItem = el.closest('.change-item');
                            let currentTitile = currentItem.querySelector('.change-item__title');
                            originaTitle.innerHTML = 'Записаться на приём к врачу: ' + currentTitile.innerHTML
                        }
                        else {
                            if (el.classList.contains('change-item__btn_current')) {
                                originaTitle.textContent = el.textContent;
                            }
                            else {
                                let currentItem = el.closest('.change-item');
                                let currentTitile = currentItem.querySelector('.change-item__title');
                                originaTitle.innerHTML = currentTitile.innerHTML
                            }
                        }
                    }
                    else {
                        originaTitle.innerHTML = originalTitlePopup2;
                    }
                }

                if (currentPopup.getAttribute('data-target') == 'popup-jobs') {
                    let currentItems = el.closest('.jobs__items') 
                    let originalText = currentPopup.querySelector('.jobs__inner_original');
                    if(originalText && currentItems.querySelector('.jobs__inner')) {
                        originalText.innerHTML = currentItems.querySelector('.jobs__inner').innerHTML;
                    }
                }
                e.stopPropagation();
                scrollWidthFunc();
                document.querySelector('html').classList.add('lock');
            }
        });
    });
    // end popups



    /* Фильтрация категорий */
    const filter = document.querySelector(".filter");
    if (filter) {
        const applyBtn = filter.querySelector(".category__filter-btn");
        const clearBtn = filter.querySelector(".category__filter-btnClear");
        const checkboxes = filter.querySelectorAll(".sort-checkbox input");
        const cardsContainer = filter.querySelector(".category__cards");
        const cards = filter.querySelectorAll(".category__card");

        const tagButtons = filter.querySelectorAll(".category__link");
        const moreBtn = filter.querySelector(".category__link-more");

        const sortNameSelect = document.getElementById("sort-name");
        const sortPriceSelect = document.getElementById("sort-price");

        let showAllTags = false;

        // Кнопка "Еще" для тегов 
        function updateTagsVisibility() {
            tagButtons.forEach((btn, index) => {
                if (btn.classList.contains("category__link-more")) return;
                btn.style.display = (!showAllTags && index >= 10) ? "none" : "inline-block";
            });
            moreBtn.textContent = showAllTags ? "Свернуть" : `Еще ${tagButtons.length - 10}`;
        }

        if (moreBtn) {
            moreBtn.addEventListener("click", () => {
                showAllTags = !showAllTags;
                updateTagsVisibility();
            });
        }

        updateTagsVisibility(); // скрыть теги при загрузке

        // Активируем/деактивируем теги
        // if (tagButtons) {
        //     tagButtons.forEach(btn => {
        //         if (!btn.classList.contains("category__link-more")) {
        //             btn.addEventListener("click", () => {
        //                 btn.classList.toggle("active");
        //                 applyFilters();
        //                 updateCheckboxesState();
        //             });
        //         }
        //     });
        // }

        document.querySelectorAll('.category__link').forEach(btn => {
            if (!btn.classList.contains("category__link-more")) {
                btn.addEventListener("click", function (e) {
                    e.preventDefault();

                    // Берём код тега из дата-атрибута
                    const tagCode = this.dataset.tagValue;

                    // Формируем URL с GET-параметром
                    const url = new URL(window.location.href);
                    url.searchParams.set('filter', tagCode);

                    // Переход по новому URL
                    window.location.href = url.toString();
                });
            }
        });


        // Функция проверки, приведет ли выбор чекбокса к пустому списку
        function willCheckboxCauseEmptyList(checkbox, currentFilters, activeTags) {
            // Создаем копию текущих фильтров и добавляем тестируемый чекбокс
            let testFilters = { ...currentFilters };
            const filterGroup = checkbox.name.split("-")[0];
            if (!testFilters[filterGroup]) testFilters[filterGroup] = [];
            testFilters[filterGroup] = [...testFilters[filterGroup], checkbox.labels[0].innerText.trim()];

            let hasVisibleCard = false;

            cards.forEach(card => {
                let visible = true;

                // Проверка по тегам
                // if (activeTags.length > 0) {
                //     const cardTags = card.dataset.tags ? card.dataset.tags.split(",").map(t => t.trim()) : [];
                //     if (!activeTags.some(tag => cardTags.includes(tag))) {
                //         visible = false;
                //     }
                // }

                // Проверка по фильтрам
                if (visible) {
                    for (let group in testFilters) {
                        let cardValues = card.dataset[group];

                        if (cardValues.includes(',')) {
                            cardValues = cardValues.split(',');
                        } else {
                            cardValues = [cardValues];
                        }

                        let matchFound = false;
                        for (const value of cardValues) {
                            if (testFilters[group].includes(value.trim())) {
                                matchFound = true;
                                break;
                            }
                        }

                        if (!matchFound && testFilters[group].length > 0) {
                            visible = false;
                            break;
                        }
                    }
                }

                if (visible) {
                    hasVisibleCard = true;
                }
            });

            return !hasVisibleCard; // Возвращает true, если список будет пустым
        }

        // Функция обновления состояния чекбоксов
        function updateCheckboxesState() {
            const activeFilters = {};
            const activeTags = [];

            // Собираем активные фильтры
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    const filterGroup = cb.name.split("-")[0];
                    if (!activeFilters[filterGroup]) activeFilters[filterGroup] = [];
                    activeFilters[filterGroup].push(cb.labels[0].innerText.trim());
                }
            });

            // Собираем активные теги
            document.querySelectorAll(".category__link.active").forEach(tag => {
                activeTags.push(tag.innerText.trim());
            });

            // Проверяем каждый чекбокс
            checkboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    const willBeEmpty = willCheckboxCauseEmptyList(checkbox, activeFilters, activeTags);
                    checkbox.disabled = willBeEmpty;
                    checkbox.parentElement.style.opacity = willBeEmpty ? '0.5' : '1'; // Визуальная индикация
                } else {
                    checkbox.disabled = false;
                    checkbox.parentElement.style.opacity = '1';
                }
            });
        }

        // Фильтрация
        function applyFilters() {
            let activeFilters = {};
            let activeTags = [];

            // Собираем фильтры (сайдбар)
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    const filterGroup = cb.name.split("-")[0];
                    if (!activeFilters[filterGroup]) activeFilters[filterGroup] = [];
                    activeFilters[filterGroup].push(cb.labels[0].innerText.trim());
                }
            });

            // Собираем активные теги
            document.querySelectorAll(".category__link.active").forEach(tag => {
                activeTags.push(tag.innerText.trim());
            });

            cards.forEach(card => {
                let visible = true;

                // Проверка по тегам (приоритетнее)
                if (activeTags.length > 0) {
                    const cardTags = card.dataset.tags ? card.dataset.tags.split(",").map(t => t.trim()) : [];
                    if (!activeTags.some(tag => cardTags.includes(tag))) {
                        visible = false;
                    }
                }

                // Проверка по фильтрам
                if (visible) {
                    for (let group in activeFilters) {
                        let cardValues = card.dataset[group];

                        if (cardValues.includes(',')) {
                            cardValues = cardValues.split(',');
                        } else {
                            cardValues = [cardValues];
                        }

                        let matchFound = false;
                        for (const value of cardValues) {
                            if (activeFilters[group].includes(value.trim())) {
                                matchFound = true;
                                break;
                            }
                        }

                        if (!matchFound && activeFilters[group].length > 0) {
                            visible = false;
                            break;
                        }
                    }
                }

                card.style.display = visible ? "block" : "none";
            });

            updateCheckboxesState(); // Обновляем состояние чекбоксов после фильтрации
        }

        // Сброс
        function clearFilters() {
            checkboxes.forEach(cb => {
                cb.checked = false;
                cb.disabled = false;
                cb.parentElement.style.opacity = '1';
            });
            applyFilters();
        }

        // Сортировка
        function applySorting() {
            let sortedCards = Array.from(cards).filter(c => c.style.display !== "none");

            if (sortNameSelect.value !== "all") {
                sortedCards.sort((a, b) => {
                    let nameA = a.querySelector(".category__card-name").innerText.toLowerCase();
                    let nameB = b.querySelector(".category__card-name").innerText.toLowerCase();
                    if (sortNameSelect.value === "asc") return nameA.localeCompare(nameB);
                    if (sortNameSelect.value === "desc") return nameB.localeCompare(nameA);
                });
            }

            if (sortPriceSelect.value !== "all") {
                sortedCards.sort((a, b) => {
                    let priceA = extractPrice(a);
                    let priceB = extractPrice(b);

                    if (sortPriceSelect.value === "asc") return priceA - priceB;
                    if (sortPriceSelect.value === "desc") return priceB - priceA;
                });
            }

            sortedCards.forEach(card => cardsContainer.appendChild(card));
        }

        // Вспомогательная функция для цены
        function extractPrice(card) {
            const priceEl = card.querySelector(".category__card-priceSort");
            if (!priceEl) return 0;
            let priceText = priceEl.innerText.replace(/[^\d]/g, "");
            return parseInt(priceText) || 0;
        }

        if (applyBtn) {
            applyBtn.addEventListener("click", () => {
                applyFilters();
                updateCheckboxesState();
            });
        }
        if (clearBtn) {
            clearBtn.addEventListener("click", clearFilters);
        }

        if (sortNameSelect) {
            sortNameSelect.addEventListener("change", applySorting);
        }
        if (sortPriceSelect) {
            sortPriceSelect.addEventListener("change", applySorting);
        }

        // Инициализация состояния чекбоксов при загрузке
        updateCheckboxesState();
    }





    // Применение фильтров
    document.querySelector('.category__filter-btn')?.addEventListener('click', function (e) {
        e.preventDefault();
        filterObjects();
    });

    // Сброс фильтров
    document.querySelector('.category__filter-btnClear')?.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.sort-checkbox input').forEach(checkbox => checkbox.checked = false);
        filterObjects('');
    });




    /* Открытие/закрытие фильтра в мобилке */
    const openFilterBtn = document.getElementById("openFilter");
    const filterWrap = document.querySelector(".category__filter");
    const applyFilterBtn = document.querySelector(".category__filter-btn");
    const clearFilterBtn = document.querySelector(".category__filter-btnClear");
    
    // Функция для открытия/закрытия фильтра
    function toggleFilter() {
        filterWrap.classList.toggle("active");
        document.querySelector('html').classList.toggle('lock');
        document.querySelector('body').classList.toggle('lock');
    }
    
    // Функция для закрытия фильтра
    function closeFilter() {
        filterWrap.classList.remove("active");
        document.querySelector('html').classList.remove('lock');
        document.querySelector('body').classList.remove('lock');
    }
    
    if (openFilterBtn) {
        // Обработчик клика по кнопке открытия
        openFilterBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleFilter();
        });
    
        // Обработчик для кнопки "Применить фильтр"
        if (applyFilterBtn) {
            applyFilterBtn.addEventListener("click", () => {
                closeFilter();
            });
        }

        // Обработчик для кнопки "Очистить фильтр"
        if (clearFilterBtn) {
            clearFilterBtn.addEventListener("click", () => {
                closeFilter();
            });
        }
    
        // Обработчик клика по документу для закрытия при клике вне окна
        document.addEventListener("click", (e) => {
            if (filterWrap.classList.contains("active") && 
                !filterWrap.contains(e.target) && 
                e.target !== openFilterBtn) {
                closeFilter();
            }
        });
    
        // Предотвращаем закрытие при клике внутри окна фильтра
        filterWrap.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    
        // Обработчик свайпа вниз, который начинается ВНЕ окна фильтра
        let swipeStartY = 0;
        let swipeStartTarget = null;
    
        document.addEventListener('touchstart', (e) => {
            if (filterWrap.classList.contains("active")) {
                swipeStartY = e.touches[0].clientY;
                swipeStartTarget = e.target;
                
                const startedInsideFilter = filterWrap.contains(swipeStartTarget) || 
                                            swipeStartTarget === filterWrap ||
                                            swipeStartTarget === openFilterBtn;
                
                if (startedInsideFilter) {
                    swipeStartY = 0;
                    swipeStartTarget = null;
                }
            }
        }, { passive: true });
    
        document.addEventListener('touchmove', (e) => {
            if (swipeStartY > 0 && filterWrap.classList.contains("active")) {
                const currentY = e.touches[0].clientY;
                
                if (currentY - swipeStartY > 100) {
                    closeFilter();
                    swipeStartY = 0;
                }
            }
        }, { passive: true });
    
        document.addEventListener('touchend', () => {
            swipeStartY = 0;
            swipeStartTarget = null;
        }, { passive: true });
    }
          
         
    
    
    /* Калькулятор */
    const calculator = document.querySelector('.calculator');
    if(calculator) {
        const BASE_PRICE = 1200;
        const radioGroups = calculator.querySelectorAll('input[type="radio"]');
        const totalPriceElement = document.getElementById('total-price');

        // Обработчик изменений для всех радио-кнопок
        radioGroups.forEach(radio => {
            radio.addEventListener('change', updatePrice);
        });
        
        function updatePrice() {
            let total = BASE_PRICE;
            
            // Собираем все выбранные радио-кнопки
            const selectedRadios = document.querySelectorAll('input[type="radio"]:checked');
            
            // Суммируем значения data-price
            selectedRadios.forEach(radio => {
                total += parseInt(radio.dataset.price) || 0;
            });
            
            // Обновляем отображение цены
            if (selectedRadios.length > 0) {
                totalPriceElement.textContent = `${total.toLocaleString('ru-RU')} рублей / сутки*`;
            } else {
                totalPriceElement.textContent = 'Выберите параметры';
            }
        }
    }
      



    /* yandex map */
    // const mapPlaceholder = document.getElementById('map-placeholder');
    // const mapCoordinates = document.getElementById('map').dataset.coordinates ? document.getElementById('map').dataset.coordinates.split(",") : [47.231129, 39.728721];
    // const mapCatalogue = document.getElementById('map').dataset.catalogue ? document.getElementById('map').dataset.catalogue : "";
    // const mapAddress = document.getElementById('map').dataset.address ? document.getElementById('map').dataset.address : "";

    // console.log(mapCoordinates);
    // if (mapPlaceholder) {
    //     mapPlaceholder.addEventListener('mouseenter', loadMap, { once: true });
    //     mapPlaceholder.addEventListener('click', loadMap, { once: true });
    // } else {
    //     loadMap();
    // }

    // function loadMap() {
    //     if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
    //         const script = document.createElement('script');
    //         script.type = 'text/javascript';
    //         script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    //         script.onload = initMap;
    //         document.head.appendChild(script);
    //     } else {
    //         initMap();
    //     }
    // }
    
    // function initMap() {
    //     const mapPlaceholder = document.getElementById('map-placeholder');
    //     if (mapPlaceholder) {
    //         mapPlaceholder.remove();
    //     }
    
    //     ymaps.ready(function () {
    //         const myMap = new ymaps.Map('map', {
    //             center: mapCoordinates,
    //             zoom: 13,
    //             controls: []
    //         });
    
    //         const myPlacemark = new ymaps.Placemark(
    //             mapCoordinates,
    //             {
    //                 hintContent: mapCatalogue + " " + mapAddress,
    //                 balloonContent: mapCatalogue + " " + mapAddress
    //             },
    //             {
    //                 iconLayout: 'default#image',
    //                 iconImageHref: '/assets/img/icons/map-pin.png',  //заменить на свою иконку
    //                 iconImageSize: [42, 50],
    //                 iconImageOffset: [-20, -25],
    //             }
    //         );
    

    //         console.log(myPlacemark);



    //         myMap.geoObjects.add(myPlacemark);
    //         myMap.behaviors.disable(['scrollZoom']);
    //     });
    // }
    /* end yandex map */


    // close cookie 
	const cookieBtn = document.querySelector('.popup-cookie__btn')
    if (cookieBtn) {
        cookieBtn.addEventListener('click', () => {
            document.querySelector('.popup-cookie').style.display = 'none';
        })
    }


    /*  search */
	const inputSearch = document.querySelectorAll('input[type=search]')
	if (inputSearch.length > 0) {
		inputSearch.forEach(elem => {
			const wrapper = elem.closest('.search-wrapper')
			if (wrapper) {
				const searchResultBlock = wrapper.querySelector('.popup__search-result')
				const popularCitiesBlock = wrapper.querySelector('.popup__search')
				const noResultsMessage = searchResultBlock.querySelector('.no-results-message')

				function search() {
					let filter = elem.value.toUpperCase()
					let ul = wrapper.querySelectorAll('.search-list')
					let totalResults = 0

					ul.forEach(item => {
						let li = item.getElementsByTagName('li')
						for (let i = 0; i < li.length; i++) {
							let a = li[i].querySelector('.search-name')
							if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
								li[i].classList.remove('none')
								totalResults++
							} else {
								li[i].classList.add('none')
							}
						}
					})
                    noResultsMessage.classList.toggle('none', totalResults > 0);

					if (elem.value.trim() === '') {
						searchResultBlock.classList.add('none')
						popularCitiesBlock.classList.remove('none')
					} else {
						searchResultBlock.classList.remove('none')
						popularCitiesBlock.classList.add('none')
					}
				}
				elem.addEventListener('input', search)

                document.addEventListener('click', (event) => {
                    if (!wrapper.contains(event.target)) {
                        searchResultBlock.classList.add('none')
                    }
                })
			}
		})
	}
    /*  end search  */  


    /*  accordion  */
	const acc = document.getElementsByClassName('accordion')
	for (let i = 0; i < acc.length; i++) {
        if(acc[i]) {
            acc[i].addEventListener('click', function () {
                const accContent = this.querySelector('.accordion__content')  || this.parentElement.querySelector('.accordion__content') 
                if (accContent.classList.contains('accordion__content--active')) {
                    accContent.classList.remove('accordion__content--active');
                    this.classList.remove('accordion--active');
                    accContent.style.maxHeight = '0'; 
                } else {
                    accContent.classList.add('accordion__content--active');
                    this.classList.add('accordion--active');
    
                    const contentHeight = accContent.scrollHeight;
                    accContent.style.maxHeight = `${contentHeight}px`;
                }
            })
        }
	}
	/*  end accordion   */


    /*  tab  */
	const showTab = elTabBtn => {
		const elTab = elTabBtn.closest('.tab');
		if (elTabBtn.classList.contains('active')) {
			return;
		}
		const targetId = elTabBtn.dataset.id;
		const elTabPanes = elTab.querySelectorAll(`.tab-content[data-id="${targetId}"]`);

		const elTabBtnActive = elTab.querySelector('.tab-btn.active');
		if (elTabBtnActive) {
			elTabBtnActive.classList.remove('active');
		}

		const elTabPaneShow = elTab.querySelectorAll('.tab-content.active');
		elTabPaneShow.forEach(pane => pane.classList.remove('active'));

		elTabBtn.classList.add('active');
		elTabPanes.forEach(pane => pane.classList.add('active'));

	};
    
    const tabButtons = document.querySelectorAll('.tab-btn')
    const tabContent = document.querySelectorAll('.tab-content')

    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].style.order = 2 * i + 1;
    }
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.order = 2 * i + 2;
    }

	tabButtons.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', function (e) {
                showTab(this);
                showMoreElements();
            });            
        }
	});
	/*  end tab */


    /*  filter element by checkbox */
    // document.querySelectorAll('.sort__item input[type="checkbox"]').forEach(function(checkbox) {
    //     checkbox.addEventListener('change', function() {
    //         filterItems('.sort__card', '.sort__block', '.sort__quantity span');
    //     });
    // });
    // filterItems('.sort__card', '.sort_block', '.sort__quantity span');
    
    // function filterItems(itemSelector, filterGroupSelector, quantitySelector) {
    //     const filterGroups = Array.from(document.querySelectorAll(filterGroupSelector)).map(group => {
    //         return Array.from(group.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.id);
    //     });
    
    //     document.querySelectorAll(itemSelector).forEach(function(item) {
    //         const itemCategories = item.dataset.categories ? item.dataset.categories.split(' ') : [];
    //         const matchesFilter = filterGroups.every(filters => {
    //             if (filters.length === 0) return true;
    //             return filters.some(filter => itemCategories.includes(filter));
    //         });
    //         if (matchesFilter) {
    //             item.style.display = '';
    //         } else {
    //             item.style.display = 'none';
    //         }
    //     });
    
    //     const visibleItems = document.querySelectorAll(`${itemSelector}:not([style*="display: none"])`).length;
    //     const quantityElement = document.querySelector(quantitySelector);
    //     if (quantityElement) {
    //         quantityElement.textContent = visibleItems;
    //     }
    //     checkAndHideBlocksIfEmpty();
    // }
    /*  end filter element by checkbox  */




    // quantity-card
    function quantityElem() {
        const quantityCards = document.querySelectorAll('.quantity-card');
        const quantityElement = document.querySelector('.quantity span');
        if (quantityElement) {
            let visibleCards = 0;
            quantityCards.forEach(card => {
                if (card.offsetParent !== null) {
                    visibleCards++;
                }
            });
            quantityElement.textContent = visibleCards;
        }
    }
    setTimeout(quantityElem, 100);



    /*  btn more  */
    function showMoreElements() {
        const moreBtns = document.querySelectorAll('.btn-more');
        moreBtns.forEach(moreBtn => {
            if (moreBtn) {
                const moreContent = moreBtn.previousElementSibling;
    
                if (moreContent.scrollHeight <= moreContent.clientHeight) {
                    moreBtn.style.display = 'none'; 
                } else {
                    moreBtn.style.display = 'block'; 
                    const textBtn = moreBtn.innerHTML; 
                    moreBtn.addEventListener('click', function() {
                        const heightMoreContent = moreContent.style.maxHeight; 
                        this.classList.toggle('active');
    
                        if (moreContent.style.maxHeight) {
                            moreContent.style.maxHeight = null;
                            this.textContent = textBtn;
                        } else {
                            moreContent.style.maxHeight = moreContent.scrollHeight + "px"; 
                            this.textContent = 'Свернуть';
                        }
                    });
                }
            }
        });
    }
    showMoreElements();
    /*  end btn more  */



    // кнопка Показать еще
    function showAllButtons() {
        const allButtons = document.querySelectorAll('.show-btn');
        
        allButtons.forEach(button => {
            const parentBlock = button.closest('.show-block');
            const items = parentBlock.querySelectorAll('.show-item');
    
            const textShow = button.innerHTML;
            const textHide = 'Скрыть';
            
            // Проверяем количество элементов
            if (items.length <= 8) {
                button.style.display = 'none';
            } else {
                button.style.display = 'block';
                button.textContent = textShow;
                
                // Скрываем элементы
                items.forEach((item, index) => {
                    if (index >= 8) {
                        item.style.display = 'none';
                    }
                });

                // Обработчик клика по кнопке
                button.addEventListener('click', function() {
                    if (button.textContent == textHide) {
                        // Скрываем элементы
                        items.forEach((item, index) => {
                            if (index >= 8) {
                                item.style.display = 'none';
                            }
                        });
                        button.textContent = textShow;
                    } else {
                        // Показываем все элементы
                        items.forEach(item => {
                            item.style.display = '';
                        });
                        button.textContent = textHide;
                    }
                });
            }
        });
    }
    showAllButtons();
    // end кнопка Показать еще


    /*   scrollTop  */
	const buttonsUp = document.querySelectorAll('.is-scroll-up')
    buttonsUp.forEach(buttonUp => {
        if (buttonUp) {
            buttonUp.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            })
        }
    });
    /*   end scrollTop  */

})

/* navigation */
const articleNavigation = document.querySelector(".navigation");
if (articleNavigation) {
    const jsScrollBlockList = document.querySelectorAll(
        ".text-block h1, .text-block h2, .text-block h3, .text-block h4, .text-block h5"
    );

    if (jsScrollBlockList.length > 0) {
        for (let i = 0; i < jsScrollBlockList.length; i += 1) {
            const jsScrollBlock = jsScrollBlockList[i];
            const titleBlock = jsScrollBlock.textContent;
            const articleNavigationList =
                document.querySelector(".navigation__list");
            const articleNavigationItem = document.createElement("li");
            const articleNavigationLink = document.createElement("a");
            if (jsScrollBlock.tagName == "H1") {
                articleNavigationItem.classList.add("nav-title-h1");
            }
            articleNavigationItem.classList.add("navigation__item");
            if (jsScrollBlock.tagName == "H2") {
                articleNavigationItem.classList.add("nav-title-h2");
            } else if (jsScrollBlock.tagName == "H3") {
                articleNavigationItem.classList.add("nav-title-h3");
            } else if (jsScrollBlock.tagName == "H4") {
                articleNavigationItem.classList.add("nav-title-h4");
            } else if (jsScrollBlock.tagName == "H5") {
                articleNavigationItem.classList.add("nav-title-h5");
            } else if (jsScrollBlock.tagName == "H6") {
                articleNavigationItem.classList.add("nav-title-h6");
            }
            articleNavigationLink.classList.add("navigation__link");
            jsScrollBlock.setAttribute("id", `${i}`);
            articleNavigationLink.setAttribute("href", `$${i}`);
            articleNavigationLink.textContent = " " + titleBlock;
            articleNavigationItem.append(articleNavigationLink);
            articleNavigationList.append(articleNavigationItem);
        }
        document.querySelectorAll('a[href^="$"').forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                let href = this.getAttribute("href").substring(1);
                const scrollTarget = document.getElementById(href);
                const topOffset = 50;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
                window.scrollBy({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            });
        });
    } else {
        if(articleNavigation.querySelector(".navigation")) {
            articleNavigation.querySelector(".navigation").remove();
        }
    }
}
/* end navigation */


// попап квиз
document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".popup-quiz__page");
    const btnPrev = document.querySelector(".popup-quiz__btn-prev");
    const btnNext = document.querySelector(".popup-quiz__btn-next");
    const pagination = document.querySelector(".popup-quiz__paginations");
    const btns = document.querySelector(".popup-quiz__bottom");

    let currentPage = 0;

    function showPage(index) {
        pages.forEach((page, i) => {
            page.style.display = i === index ? "block" : "none";
        });

        // кнопка "Предыдущий"
        btnPrev.disabled = index === 0;

        // обновление пагинации
        pagination.querySelector("span:first-child").textContent = String(index + 1).padStart(2, "0");
        pagination.querySelector("span:last-child").textContent = String(pages.length-1).padStart(2, "0");

        // проверяем доступность кнопки "Следующий"
        checkNextAvailability();

        // если последняя страница → скрываем кнопку "Следующий"
        if (index === pages.length - 1) {
            btns.style.display = "none";
        } else {
            btns.style.display = "flex";
        }
    }

    function checkNextAvailability() {
        const inputs = pages[currentPage].querySelectorAll("input[type=radio], input[type=checkbox]");
        if (inputs.length === 0) {
            btnNext.disabled = false;
            return;
        }

        let checked = Array.from(inputs).some(input => input.checked);
        btnNext.disabled = !checked;
    }

    // события
    btnPrev.addEventListener("click", () => {
        console.log(btnPrev)
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });

    btnNext.addEventListener("click", () => {
        console.log("btnNext")
        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // следим за изменением radio/checkbox
    pages.forEach(page => {
        page.addEventListener("change", () => {
            if (page === pages[currentPage]) {
                checkNextAvailability();
            }
        });
    });

    // инициализация
    showPage(currentPage);
});


// мобильное меню
document.addEventListener("DOMContentLoaded", () => {
    const arrows = document.querySelectorAll(".header__nav-arrow");
  
    function isMobile() {
      return window.innerWidth <= 1024;
    }
  
    function setHeight(el) {
      el.style.maxHeight = el.scrollHeight + "px";
    }
  
    // обновляем высоту у родителей
    function updateParents(submenu) {
      let parent = submenu.parentElement;
      while (parent) {
        if (parent.tagName === "UL" && parent.classList.contains("open")) {
          parent.style.maxHeight = parent.scrollHeight + "px";
        }
        parent = parent.parentElement;
      }
    }
  
    arrows.forEach(arrow => {
      arrow.addEventListener("click", e => {
        if (!isMobile()) return;
        e.preventDefault();
  
        const parentItem = arrow.closest(".header__nav-item");
        const submenu = parentItem.querySelector("ul");
  
        if (submenu) {
          if (submenu.classList.contains("open")) {
            // закрытие
            submenu.style.maxHeight = submenu.scrollHeight + "px"; 
            submenu.offsetHeight; 
            submenu.style.maxHeight = "0px";
            submenu.classList.remove("open");
            arrow.classList.remove("active");
          } else {
            // открытие
            submenu.classList.add("open");
            setHeight(submenu);
            arrow.classList.add("active");
            updateParents(submenu);
          }
        }
      });
    });
  
    document.querySelectorAll(".header__sublist, .header__subsublist").forEach(ul => {
      ul.addEventListener("transitionend", () => {
        if (ul.classList.contains("open")) {
          setHeight(ul);       
          updateParents(ul);  
        }
      });
    });
  
    // сброс на десктопе
    window.addEventListener("resize", () => {
      if (!isMobile()) {
        document.querySelectorAll(".header__sublist, .header__subsublist").forEach(ul => {
          ul.style.maxHeight = null;
          ul.classList.remove("open");
        });
        arrows.forEach(arrow => arrow.classList.remove("active"));
      }
    });
});
  

