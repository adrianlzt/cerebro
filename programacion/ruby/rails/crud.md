Create
 t = Tweet.new
 t.status = "I love brains"
 t.save

 t = Tweet.new(:status => "blabla", :user => "pepito")
 t.save

 Tweet.create(:status => "blabla", :user => "pepito")

Read
 Tweet.find(3) nos devuelve el elemento con id=3
 Tweet.find(3,4,6,8)
 Tweet.first
 Tweet.last
 Tweet.all <- nos devuelve un array de elementos
 Tweet.count
 Tweet.order(:status)
 Tweet.limit(10)
 Tweet.where(:user => "hotr")
 Todo esto se puede encadenar: Tweet.where().limit().order()

Update
 t = Tweet.find(3)
 t.zombie = "Pepe"
 t.save

 t = Tweet.find(2)
 t.attributes = {
                  :status => "blala",
		  :user => "pepe"
		}
 t.save

 t.update_attributes = {
                         :status => "blala",
            	         :user => "pepe"
		       }

Delete
 t = Tweet.find(3)
 t.destroy

 Tweet.find(3).destroy

 Tweet.destroy_all
