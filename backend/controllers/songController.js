const song = require("../models/song")
const getSongs=async(req,res)=>{
    try{
        const songs=await song.find()
        res.json(songs)

    }catch(error){
        res.status(500).json({message:error.message})
    }
}
const createSong=async(req,res)=>{
    try{
        const {title,artist,album,gener}=req.body
       if(!artist&&!title) {
        return res.status(400).json({message:"title and artist are required"})
       }
      const songs=new song({title,artist,album,gener})
      const savedsong=await songs.save()
      res.status(201).json(savedsong)

    }catch(error){
        res.status(400).json({
        message:error.message
        })
    }
}
const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSong = await song.findByIdAndUpdate(id, req.body, {
      new: true, // return updated doc
    });

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.json(updatedSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSong = await song.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getStats = async (req, res) => {
  try {
    const totalSongs = await song.countDocuments();
    const totalArtists = await song.distinct("artist").then((a) => a.length);
    const totalAlbums = await song.distinct("album").then((a) => a.length);
    const totalGenres = await song.distinct("gener").then((g) => g.length);

    const songsPerGenre = await song.aggregate([
      { $group: { _id: "$gener", count: { $sum: 1 } } },
    ]);

    const songsPerArtist = await song.aggregate([
      { $group: { _id: "$artist", count: { $sum: 1 } } },
    ]);

    const songsPerAlbum = await song.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } },
    ]);

    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsPerGenre,
      songsPerArtist,
      songsPerAlbum,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getSongs, createSong, updateSong, deleteSong,getStats };
