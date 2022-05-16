const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const newBand = await Band.create({name: 'Bandy', genre: 'Rock'});
        expect(newBand.name).toBe('Bandy');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const newMusician = await Musician.create({name: "Mr. Music Man", instrument: "Guitar"});
        expect(newMusician.name).toBe('Mr. Music Man');
    })

    test('associate musicians to band', async () => {
        const newBand = await Band.create({name: 'Bandy', genre: 'Rock'});
        const newMusician2 = await Musician.create({name: "Drummer Boy", instrument:"Drums"});
        const newMusician1 = await Musician.create({name: "Mr. Music Man", instrument: "Guitar"});

        await newBand.addMusician(newMusician1);
        await newBand.addMusician(newMusician2);

        const musicians = await newBand.getMusicians();

        expect(musicians.length).toBe(2);
    })

    test('create song', async () => {
        const newSong = await Song.create({title: 'Groovy', year: 2021});

        expect(newSong.title).toBe("Groovy");
    })

    test('associate songs to bands', async () => {
        const newBand = await Band.create({name: 'Bandy', genre: 'Rock'});
        const newSong1 = await Song.create({title: 'Groovy', year: 2021});
        const newSong2 = await Song.create({title: 'Cats', year: 2022});

        await newBand.addSong(newSong1);
        await newBand.addSong(newSong2);

        const songs = await newBand.getSongs();

        expect(songs.length).toBe(2);
    })

    test('associate bands to songs', async () => {
        const newBand1 = await Band.create({name: 'Bandy', genre: 'Rock'});
        const newBand2 = await Band.create({name: "Dogs", genre: "Pop"});
        const newSong = await Song.create({title: 'Groovy', year: 2021});
    
        await newBand1.addSong(newSong);
        await newBand2.addSong(newSong);

        const bands = await newSong.getBands();

        expect(bands.length).toBe(2);
    })
})