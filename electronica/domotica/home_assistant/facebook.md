Cosas que podemos devolver:
https://developers.facebook.com/docs/messenger-platform/send-api-reference


Mensaje con quick replies
{"message":"prueba con cosas", "target": "xxxxxxxxxxx", "data":{"quick_replies":[{"content_type":"text","title":"Red","payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"}]}}

Mensaje con adjunto (un mp3):
{"message":"prueba con cosas", "target": "xxxxxxxxxx", "data":{"attachment":{ "type":"audio", "payload":{ "url":"http://www.noiseaddicts.com/samples_1w72b820/4929.mp3" } }}}

Adjunto imagen:
{"message":"prueba con cosas", "target": "xxxxxxxxx", "data":{"attachment":{ "type":"image", "payload":{ "url":"https://i.ytimg.com/vi/Bor5lkRyeGo/hqdefault.jpg" } }}}

Video adjunto:
{"message":"prueba con cosas", "target": "xxxxxxxxxx", "data":{"attachment":{ "type":"video", "payload":{ "url":"http://techslides.com/demos/sample-videos/small.mp4" } }}}


Card (titulo, subtitulo, texto y botones):
{"message":"prueba con cosas", "target": "xxxxxxxxx", "data":{"attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title":"Welcome to Peters Hats",
            "item_url":"https://petersfancybrownhats.com",
            "image_url":"https://i.ytimg.com/vi/Bor5lkRyeGo/hqdefault.jpg",
            "subtitle":"Weve got the right hat for everyone.",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },
              {
                "type":"postback",
                "title":"Start Chatting",
                "payload":"que temperatura hace en casa?"
              }              
            ]
          }
        ]
      }
    }}}


Botones:
{"message":"prueba con cosas", "target": "xxxxxxxxx", "data":{"attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What do you want to do next?",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://petersapparel.parseapp.com",
            "title":"Show Website"
          },
          {
            "type":"postback",
            "title":"Start Chatting",
            "payload":"USER_DEFINED_PAYLOAD"
          }
        ]
      }
    }
}}
