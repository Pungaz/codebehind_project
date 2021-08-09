# Assignment

```
Napisati javascript program generisanja žreba za turnir u tenisu.
Broj tenisera koji učestvuju na turniru je definisan parametrom N koji ne sme biti veći od 64.
Svakog tenisera definišu 4 parametra: Ime(name), Prezime(lastName), Zemlja porekla(country), Ranking(ranking)
Teniseri ne mogu deliti isti ranking.
Teniseri u prvoj rundi ne mogu igrati protiv igrača koji je direktno ispred ili ispod njih na rang listi.
Nakon generisanog žreba, napisati simulaciju turnira i u output ispisati svaki krug turnira i, naravno, pobednika.
Za simulaciju pobednika dovoljno je nasumično izabrati jednog tenisera.

Nije dozvoljeno korišćenje dodatnih third party biblioteka (koje već nisu uključene u projekat).

Primer input-a:
Unesite broj tenisera N: 8
Unesite tenisera u obliku [ime],[prezime],[drzava],[ranking]:Novak,Djokovic,SRB,1
Unesite tenisera u obliku [ime],[prezime],[drzava],[ranking]:Rafael,Nadal,ESP,2
...
N redova

Primer output-a za turnir od 8 igrača:

Round 1:
1. N. Djokovic (SRB, 1) - P. Busta (ESP, 11)
2. D. Thiem (AU, 6) - H. Hurkacz (PL, 12)
3. D. Medvedev (RUS, 2) - A. Zverev (GER, 5)
4. R. Nadal (ESP, 3) - A. Rublev (RUS, 7)
Round 2 / Semifinals:
1. N. Djokovic (SRB, 1) - D. Thiem (AU, 6)
2. D. Zverev (GER, 5) - R. Nadal (ESP, 3)
Final:
1. N. Djokovic (SRB, 1) - R. Nadal (ESP, 3)
Winner:
  !!! N. Djokovic (SRB, 1) !!!

Bonus (opciono):
1. Unos tenisera iz fajla (u bilo kojoj željenoj strukturi - json, csv, plain, ...)
2. U simulaciji i std output-u dodati rezultat svakog meča
3. Validacija input grešaka
```

### Prerequisites

Installed NODE.js on your system. Refer to HTTP://nodejs.org/en/download/

### Steps to run application (run in command line or terminal):

```
npm install
npm start
```


#############
Documentation
#############

Run the app the same way as defined above



### How does the app work

You are asked to choose the input type, after deciding on the type you can either input it by hand or have the information be loaded in from a file.
The players then go to qualifiers where everyone plays everyone ones. Only 16 players pass, if there are less then 16 then we allow the biggest possible product of 4 to go to the playoffs.
In playoffs we will get our tournament winner and we will also see all the scores in previous games.



