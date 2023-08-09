import { getAllEvents, addEvent, getEventByID, updateEvent, deleteEvent, getEventsByCategory, getEventsByLocation, getEventsByDate } from "../models/eventModel.js";

export const getAllEventsController = async (req, res) => {
    try {
        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getEventByIDController = async (req, res) => {
    const { id } = req.params;
    
    try {
        const event = await getEventByID(id);
        if (!event) {
            res.status(404).json({msg: 'Event not found'});
        }
        res.status(200).json(event);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getEventsByDateController = async (req, res) => {
    const { date } = req.query;
  
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }
  
    try {
      const events = await getEventsByDate(date);
      
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

export const getEventsByCategoryController = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const events = await getEventsByCategory(categoryId);
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getEventsByLocationController = async (req, res) => {
    const { locationId } = req.params;
    try {
        const events = await getEventsByLocation(locationId);
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const addEventController = async (req, res) => {  

    const user_id = req.user;
    console.log('UserId controller: ', req.user);

    console.log('Req.body: ', req.body);
    const {title, description, date, time, location_id, image, category_id, price, address, quantity_available, max_price} = req.body;


    try {
        const newEvent = await addEvent({
            title,
            description,
            date,
            time,
            location_id,
            image,
            category_id,
            price,
            address,
            quantity_available,
            max_price,
            
        }, user_id);

        console.log('newEvent from Controller: ', newEvent);

        //if all okay - 201
        res.status(201).json(newEvent);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateEventController = async (req, res) => {
    const { id } = req.body;
    const eventData = req.body;

    try {
        const updatedEvent = await updateEvent(id, eventData);
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const deleteEventController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedEvent = await deleteEvent(id);
      if (!deletedEvent) {
        res.status(404).json({ msg: 'Event not found' });
      }
      res.status(200).json(deletedEvent);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  