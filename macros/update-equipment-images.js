// Update Equipment Item Images Macro
// Changes the image for all world items of type "equipment" to use Equipment.png

(async () => {
    // Configuration
    const targetType = "equipment";
    const newImagePath = "systems/masacre/assets/img/Equipment.png";
    
    // Get all world items of type "equipment"
    const equipmentItems = game.items.filter(item => item.type === targetType);
    
    if (equipmentItems.length === 0) {
        ui.notifications.warn("No equipment items found in the world.");
        return;
    }
    
    // Update each equipment item
    let updatedCount = 0;
    const updates = equipmentItems.map(item => {
        updatedCount++;
        return {
            _id: item.id,
            img: newImagePath
        };
    });
    
    // Apply updates
    await Item.updateDocuments(updates);
    
    ui.notifications.info(`Updated ${updatedCount} equipment item(s) with new image.`);
    console.log(`Equipment Image Update: ${updatedCount} items updated to ${newImagePath}`);
})();
