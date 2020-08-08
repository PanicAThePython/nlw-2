module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){ //sem o async, não posso usar o await
    const insertedProffy = await db.run(`
        INSERT INTO proffys(nome, avatar, whatsapp, bio) 
        VALUES(
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}" );
    
    `)
    const proffy_id = insertedProffy.lastID

    const insertedClass = await db.run(`
        INSERT INTO classes(subject, cost, proffy_id) 
        VALUES(
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}" );
    
    `)
    const class_id = insertedClass.lastID

    const insertedAllClassScheduleValues = classScheduleValues.map((scheduleValue)=>{
        return db.run(`
        INSERT INTO class_schedule(class_id, weekday, time_from, time_to) 
        VALUES(
            "${class_id}",
            "${scheduleValue.weekday}",
            "${scheduleValue.time_from}",
            "${scheduleValue.time_to}" );`)
    })
    await Promise.all(insertedAllClassScheduleValues)
}