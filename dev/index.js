// 1. Create manager process, which pushes tasks and subscribes to events and links
//      only start assigning tasks when the event start is sent
//      kill process when the event stop is sent
//      tasks are pages to scrape
//      start sending tasks from a list of links generated from ToC
//      subscribe to new links, and send tasks when new links are received

            
// 2. Create multiple workers which pull tasks, push results, and publish ready and links
//      each worker has a headless browser
//      when the worker has its browser open, it publishes ready
//      pulls links from manager then:
//            - navigate to the page 
//            - scrape then content
//            - publish the link
//            - push the result (needs to be an object)
// 3. Create compiler which pulls results, subscribes to ready, and publishers events
//      events are ready and stop