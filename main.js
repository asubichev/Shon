const Discord = require('discord.js');

const token = 'NzM4OTMzMTY4NDQ2NjM2MDgz.XyTHJA.4Fj2Rrhy3t1BZmWf1oz-EzMC3Z8';

const client = new Discord.Client();

const PREFIX = "-";

const stringIsAValidUrl = (s) => {
    try {
      new URL(s);
      return true;
    } catch (err) {
      return false;
    }
  };

client.once('ready', () =>  {
    console.log('Shon is on!');
})

client.on('message', message=>{

    var profanity = require('2toad/profanity').profanity;
    if(profanity.exists(message.content))
    {
        message.delete()
        .then(msg => console.log('Message by ' + message.author.username + ' was deleted for profanity.'))
    }

    //only f in f-chat
    if(message.channel.name == "f-chat")
    {
        if(message.content !== 'f')
        {
            message.delete()
            .then(msg => console.log( /*time*/ + 'Message by ' + message.author.username + ' has been deleted in ' + message.channel.name + '.'))
            .catch(console.error);
        }
    }


    //no invite-links in other channels
    if (!message.author.bot && message.channel.name != "invite-links")
    {
        if(validURL(message.content) && message.content.includes('w2g') || message.content.includes('codingame') || message.content.includes('sketchful')) 
        {
            message.delete()
            .then(msg => console.log( /*time*/ + '  Message by ' + message.author.username + ' has been deleted in ' + message.channel.name + '.'))
            .catch(console.error);
        }
    }

    //links only in invite-links - COMPLETE! although not optimal coding...
    if (!message.author.bot && message.channel.name == "invite-links" || message.channel.id == 725514511414460497)
    {
        var expression = /.*[:][!\/][!\/].*/;
        var regex = new RegExp(expression);
        if(!message.content.match("^[A-Z]{6}$") && !validURL(message.content))
        {
            message.delete()
            .then(msg => console.log( /*time*/ + '  Message by ' + message.author.username + ' has been deleted in ' + message.channel.name + '.'))
            .catch(console.error);
        }
        
    }


    //music commands deleted in other channels(no music in other channels)
    if(!message.author.bot && message.channel.name != "music-house")
    {
        if(message.content.startsWith('-'))
        {
            message.delete()
            .then(msg => console.log('Message by ' + message.author.username + ' has been deleted in ' + message.channel.name + '.'))
            .catch(console.error);
        }
    }
    //music commands only in music-house
    if(!message.author.bot && message.channel.name == "music-house")
    {
        if(!message.content.startsWith('-'))
        {
            message.delete()
            .then(msg => console.log('Message by ' + message.author.username + ' has been deleted in ' + message.channel.name + '.'))
            .catch(console.error);
        }
    }

})//                          message.channel.send(''); how to send message btw




function validURL(str)
{
    var expression = /.*[:][!\/][!\/].*/;
    var regex = new RegExp(expression);
    if(!stringIsAValidUrl(str))
    {
    return false;
    }
    else if ( !str.match( expression ) )// colon specs
    {
        return false;
    }
    else if( str.match( /^[a-z]:\/\// ) )// doesn't allow [a-z]:// specifically - hard coded :(
    {
        return false;
    }
    return true;
}

/*function validURL(str)
{
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(str.match(expression))return true;
    return false;
    /*var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}*/

client.login(token);
