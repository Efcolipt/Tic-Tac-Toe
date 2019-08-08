$(document).ready(function () {
	var scoreUser = 0 , scorePC = 0 ,userPlayerNameTwo,userPlayerNameOne, playerNow = "X", randLast = [] , winnerMoveUser = [] , winnerMovePC = [] , counterGame , counterWinnerPC , counterWinnerUser , counterDraw,counterWinX,counterWin0,NumberOfGamesUsers,counterDrawUsers;
	var gameMoveCombination = { 
		// Horizontal
		one: [1,2,3],
		two: [4,5,6],
		free: [7,8,9],
		// Vertical
		four: [1,4,7],
		five: [2,5,8],
		six: [3,6,9],
		// Diagonally
		seven: [1,5,9],
		eight: [3,5,7]
	}

	var game = confirm("Сыграем?");


	function CleanGameTable(){
		$('.mgid--val').html(" ");
		randLast = [];
		scoreUser = 0;
		scorePC = 0;
		winnerMoveUser = [];
		winnerMovePC = [];
		$('.mgid--val').attr('data-id',0);
		playerNow = "X";
		movePlayerX=[];
		movePlayer0=[];
		scorePlayer0 = 0;
		scorePlayerX=0;
	}





	function getRandomArbitrary(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}


	function setCounterGame() {
		if (localStorage.getItem('counterGame')) {
			counterGame = localStorage.getItem('counterGame') ;

		}else{
			localStorage.setItem('counterGame', "0")
			counterGame = 0;
		}

		if (localStorage.getItem('counterWinX')) {
			counterWinX = localStorage.getItem('counterWinX') ;

		}else{
			localStorage.setItem('counterWinX', "0")
			counterWinX = 0;
		}
		if (localStorage.getItem('counterWin0')) {
			counterWin0 = localStorage.getItem('counterWin0') ;

		}else{
			localStorage.setItem('counterWin0', "0")
			counterWin0 = 0;
		}
		if (localStorage.getItem('counterDrawUsers')) {
			counterDrawUsers = localStorage.getItem('counterDrawUsers') ;

		}else{
			localStorage.setItem('counterDrawUsers', "0")
			counterDrawUsers = 0;
		}
		
		if (localStorage.getItem('NumberOfGamesUsers')) {
			NumberOfGamesUsers = localStorage.getItem('NumberOfGamesUsers') ;

		}else{
			localStorage.setItem('NumberOfGamesUsers', "0")
			NumberOfGamesUsers = 0;
		}

		if (localStorage.getItem('counterWinnerPC')){
			counterWinnerPC = localStorage.getItem('counterWinnerPC');
		}
		else{
			localStorage.setItem('counterWinnerPC',"0")
			counterWinnerPC = 0 ;
		}
		if (localStorage.getItem('counterDraw')){
			counterDraw = localStorage.getItem('counterDraw');
		}
		else{
			localStorage.setItem('counterDraw',"0")
			counterDraw = 0 ;
		}

		if ( localStorage.getItem('counterWinnerUser')) {
			counterWinnerUser =localStorage.getItem('counterWinnerUser');
		}else{
			localStorage.setItem('counterWinnerUser',"0")
			counterWinnerUser = 0 ;
		}	


	}

	function diff(winnerMove, gameMoveCombination){
		var matchingCombinations = 0 ;
		for (var i = winnerMove.length; i >= 0; i--) {
			if (gameMoveCombination.indexOf(winnerMove[i]) != -1) {
				matchingCombinations++;
				if (matchingCombinations >= 3) {
					return true;
				}			 			
			}

		}
		return false;
	}

	function gameOnTwo(){
		$('.alert-info').css({'display':'block'}).text('Ходит: ' + userPlayerNameOne);
		randLast = [];
		var movePlayerX=[], movePlayer0=[],scorePlayer0 = 0, scorePlayerX=0;
		$('.mgid--cell').click(function(){
			var data_id = $(this).find(".mgid--val").attr("data-id");
			var mgidCount = $(this).attr('data-mgid-count');
			// Вывод 
			console.log("-----------------------------------------------------------------------");
			console.log("Краткая информация");
			console.log("-----------------------------------------------------------------------");
			console.log(`Ходит: ${playerNow}`);
			console.log(`Занятые клетки: ${randLast.sort()}`);
			console.log(`Клетка: ${mgidCount}`);
			console.log(`${userPlayerNameOne}: ${scorePlayerX}`);
			console.log(`${userPlayerNameTwo}: ${scorePlayer0}`);
			console.log(`Ходы ${userPlayerNameOne}: ${movePlayerX}`);
			console.log(`Ходы ${userPlayerNameTwo}: ${movePlayer0}`);
			console.log(`Кол-во занятных клеток: ${randLast.length}`);
			if (scorePlayerX == 0 &&  scorePlayer0 == 0) {
				if (data_id == 0 ) {
					if (playerNow == "X") {
						randLast.push(+mgidCount);
						$(this).find(".mgid--val").text("X").attr('data-id',1);
						playerNow = "0";
						$('.alert-info').css({'display':'block'}).text('Ходит: ' + userPlayerNameTwo);
						movePlayerX.push(+mgidCount);

					}else{
						randLast.push(+mgidCount);
						$(this).find(".mgid--val").text("0").attr('data-id',2);
						playerNow = "X";
						$('.alert-info').css({'display':'block'}).text('Ходит: ' + userPlayerNameOne);
						movePlayer0.push(+mgidCount);
						$('.alert-info').css({'display':'block'}).text('Ходит: ' + userPlayerNameOne);
					}
				}
			}
			for (var key in gameMoveCombination) {
				if (movePlayerX.length >= 3 || movePlayer0 >= 3 ) {				
					if(diff(movePlayerX,gameMoveCombination[key])){
						scorePlayerX = 1;
						break;
					}else{
						if(diff(movePlayer0,gameMoveCombination[key])){
							scorePlayer0 = 1;
							break;
						}
					}
				}else{
					break;
				}

			}

			if (scorePlayerX == 1 && scorePlayer0 == 0) {
				$('.mgid--cell').off();
				counterWinX = localStorage.getItem('counterWinX');
				counterWinX++;
				localStorage.setItem('counterWinX',counterWinX);

				NumberOfGamesUsers = localStorage.getItem('NumberOfGamesUsers');
				NumberOfGamesUsers++;
				localStorage.setItem('NumberOfGamesUsers',NumberOfGamesUsers);

				alert(`${userPlayerNameOne} выиграл!`);
				console.log(`${userPlayerNameOne} выиграл!`);
			}
			if (scorePlayerX == 0 && scorePlayer0 == 1) {
				$('.mgid--cell').off();
				counterWin0 = localStorage.getItem('counterWin0');
				counterWin0++;
				localStorage.setItem('counterWin0',counterWin0);

				NumberOfGamesUsers = localStorage.getItem('NumberOfGamesUsers');
				NumberOfGamesUsers++;
				localStorage.setItem('NumberOfGamesUsers',NumberOfGamesUsers);
				alert(`${userPlayerNameTwo} выиграл!`);
				console.log(`${userPlayerNameTwo} выиграл!`);
			}
			if (scorePlayerX == 1 && scorePlayer0 == 1) {
				$('.mgid--cell').off();
				counterWin0 = localStorage.getItem('counterWin0');
				counterWin0++;
				localStorage.setItem('counterWin0',counterWin0);

				NumberOfGamesUsers = localStorage.getItem('NumberOfGamesUsers');
				NumberOfGamesUsers++;
				localStorage.setItem('NumberOfGamesUsers',NumberOfGamesUsers);
				alert(`${userPlayerNameTwo} выиграл!`);
				console.log(`${userPlayerNameTwo} выиграл!`);
			}
			if (randLast.length == 9) {
				$('.mgid--cell').off();
				NumberOfGamesUsers = localStorage.getItem('NumberOfGamesUsers');
				NumberOfGamesUsers++;
				localStorage.setItem('NumberOfGamesUsers',NumberOfGamesUsers);
				counterDrawUsers = localStorage.getItem('counterDrawUsers');
				counterDrawUsers++;
				localStorage.setItem('counterDrawUsers',counterDrawUsers);
				alert(`Ничья!`);
				console.log(`Ничья!`);
			}
		});
	}


	function startGame(){
		$('.mgid--cell').click(function(){
			var data_id = $(this).find(".mgid--val").attr("data-id");
			var rand = getRandomArbitrary(1,randIs);
			var s = 0;
			var mgidCount = $(this).attr('data-mgid-count');
			var v = 1,i = 0,c = 1;
			if (data_id == 0 ) {


				randLast.push(+mgidCount);
				winnerMoveUser.push(+mgidCount);


				$(this).find(".mgid--val").text("X");
				data_id++;
				$(this).find(".mgid--val").attr("data-id",data_id);


				while (randLast.length >= s) {
					if(randLast.length == lengthRandLastMax){
						break;
					}
					if (rand == randLast[s]) {
						rand = getRandomArbitrary(1,randIs);
						s = 0;
					}else{
						s++;
					}

				}


				for (var key in gameMoveCombination) {
					if (winnerMovePC.length >= 3) {				
						if(diff(winnerMovePC,gameMoveCombination[key])){
							scorePC = 1;
							break;
						}
					}else{
						break;
					}

				}

				for (var key in gameMoveCombination) {
					if (winnerMoveUser.length >= 3) {				
						if(diff(winnerMoveUser,gameMoveCombination[key])){
							scoreUser = 1;
							break;
						}
					}else{
						break;
					}

				}


				if ($('[data-mgid-count="'+rand+'"]').find('.mgid--val').attr('data-id') == 0) {
					$('[data-mgid-count="'+rand+'"]').find('.mgid--val').attr('data-id',2)
					$('[data-mgid-count="'+rand+'"]').find('.mgid--val').text("O");
					randLast.push(+rand);
					winnerMovePC.push(+rand);
				}


				if (scoreUser == 1  && scorePC == 1) {
					scoreUser = 0;
				}


				if (randLast.length == lengthRandLastMax  &&  (scoreUser == 0  && scorePC == 0)) {
					counterGame = localStorage.getItem('counterGame');
					counterGame++;
					localStorage.setItem('counterGame',counterGame);
					counterDraw = localStorage.getItem('counterDraw');
					counterDraw++;
					localStorage.setItem('counterDraw',counterDraw);
					alert("Ничья!");
					$('.mgid--cell').off();
					console.log(`Ничья!`);
				}


				if (scoreUser == 0  && scorePC != 0) {
					counterWinnerPC = localStorage.getItem('counterWinnerPC');
					counterWinnerPC++;
					localStorage.setItem('counterWinnerPC',counterWinnerPC);
					counterGame = localStorage.getItem('counterGame');
					counterGame++;
					localStorage.setItem('counterGame',counterGame);
					$('.mgid--cell').off();
					alert("Вы проиграли , PC выиграл!");
					console.log(`PC выиграл!`);
				}


				if (scoreUser != 0  && scorePC == 0) {
					counterWinnerUser = localStorage.getItem('counterWinnerUser');
					counterWinnerUser++;
					localStorage.setItem('counterWinnerUser',counterWinnerUser);
					counterGame = localStorage.getItem('counterGame');
					counterGame++;
					localStorage.setItem('counterGame',counterGame);
					$('.mgid--cell').off();
					alert(userName + " Выиграл");
					console.log(`${userName} выиграл!`);
				}

			// Вывод 
			console.log("-----------------------------------------------------------------------");
			console.log("Краткая информация");
			console.log("-----------------------------------------------------------------------");
			console.log("Количество игр: "+counterGame+ "\nКоличество побед у PC: " + counterWinnerPC+ "\nКоличество побед у "+userName+": " +counterWinnerUser + "\nНичьи: " + counterDraw);
			console.log(`Рандомное число: ${rand}`);
			console.log(`Занятые клетки: ${randLast.sort()}`);
			console.log(`Клетка: ${mgidCount}`);
			console.log(`UserScore: ${scoreUser}`);
			console.log(`Ходы ${userName}: ${winnerMoveUser}`);
			console.log(`Ходы PC: ${winnerMovePC}`);
			console.log(`Кол-во занятных клеток: ${randLast.length}`);

		}
	});
	}


	if (game) {


		var	table = confirm('Выберте поле \n 4x4(Нажмите Ок) или 3х3(Нажмите отмена)');
		if (table) {
			$('.alert-info').text('Таблица 4х4 работает не корректно').css({'display':'block'});
			$('body').addClass('mgid--box--4x4 botPlus');
			var randIs= 17,lengthRandLastMax = 16,g = 1;
			while(16 >= g){
				$('.mgid--box').append('<div class="mgid--inner--block--4x4 mgid--cell"  data-mgid-count="'+g+'"><div class="mgid--content--4x4 mgid--val" data-id="0"></div></div>');
				g++;
			}
		}else{
			$('body').addClass('mgid--box--3x3 botPlus');
			var g = 1,lengthRandLastMax = 9;
			while(9 >= g){

				$('.mgid--box').append('<div class="mgid--inner--block--3x3 mgid--cell"  data-mgid-count="'+g+'"><div class="mgid--content--3x3 mgid--val" data-id="0"></div></div>');
				g++;
			}
			var randIs = 10;
		}


		$('.showState').click(function(){
			var data_id  =  $(this).attr('data-id');
			if (data_id == 0 ) {
				$('.state').slideDown('slow');
				$(this).attr('data-id',1);
			}else{
				$('.state').slideUp('slow');
				$(this).attr('data-id',0)
			}
		});

		$('.cleanTable').click(function(){

	        if ($('body').hasClass('botPlus')) {
	        	CleanGameTable();
				startGame();
				console.clear();
				$('.userName').text(userName);
				$('.counterGame').text(counterGame);
				$('.counterWinnerUser').text(counterWinnerUser);
				$('.userNameTwo').text('PC');
				$('.counterWinnerPC').text(counterWinnerPC);
				$('.counterDraw').text(counterDraw);
	        }

	        if ($('body').hasClass('GameTwo')) {
	        	CleanGameTable();
	        	gameOnTwo();
	        	console.clear();
	        	$('.userName').text(userPlayerNameOne);
				$('.userNameTwo').text(userPlayerNameTwo);
				$('.counterGame').text(NumberOfGamesUsers);
				$('.counterWinnerUser').text(counterWinX);
				$('.counterWinnerPC').text(counterWin0);
				$('.counterDraw').text(counterDrawUsers);
	        }

		});


		CleanGameTable();
		var userName = prompt("Как вас звать?" , "User");
		if (userName == false ) {
			userName = "User";
		}
		setCounterGame();
		startGame();
		console.clear();
		$('.userName').text(userName);
		$('.counterGame').text(counterGame);
		$('.counterWinnerUser').text(counterWinnerUser);
		$('.counterWinnerPC').text(counterWinnerPC);
		$('.counterDraw').text(counterDraw);
	}else{
		window.location.replace("index.html");

	}
	$('.gameIs').click(function(){
		var mgidNow = $(this).attr('mgid-now')

			if (mgidNow == "gameTwo") {
				$('body').removeClass('GameTwo');
				$('body').addClass('botPlus');
				console.clear();
				$('.gameIs').text("Игра на двоих");
				$('.mgid--cell').off();
				CleanGameTable();
				startGame();
				$(this).attr('mgid-now',"bot");
				$('.alert-info').slideUp('slow');
			}else{

				$('body').removeClass('botPlus');
				$('body').addClass('GameTwo');

 				$('.gameIs').text("Игра с ботом");
			
				 userPlayerNameOne = prompt("Имя первого игрока ?","User1");
				 userPlayerNameTwo = prompt("Имя второго игрока ?","User2");


				 if (userPlayerNameOne == false ) {
				 	userPlayerNameOne = "User1";
				 }
				 if (userPlayerNameTwo == false ) {
				 	userPlayerNameTwo = "User2";
				 }

				

				 $('.mgid--cell').off();
				$('.userName').text(userPlayerNameOne);
				$('.userNameTwo').text(userPlayerNameTwo);
				$('.counterGame').text(NumberOfGamesUsers);
				$('.counterWinnerUser').text(counterWinX);
				$('.counterWinnerPC').text(counterWin0);
				$('.counterDraw').text(counterDrawUsers);
				 CleanGameTable();
				 console.clear() 
				 gameOnTwo();
				 $(this).attr('mgid-now',"gameTwo");
			}




		});
	
});

if (!navigator.cookieEnabled) {
	alert( 'Включите cookie для комфортной игры' );
}
