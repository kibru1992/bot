const { Telegraf, Markup } = require('telegraf');
const path = require('path');
// Create a new Telegraf instance with your Telegram Bot token
const bot = new Telegraf('6938169328:AAHQ0LbupIllIU2nyU8qE1Jp01PLiPljO2s');

// Departments data
const departments = [
  { name: 'የጸሎት አስተባባሪዎች/prayers ', description: 'በአጠቃላይ ህብረቱ ካሉ የአገልግሎት ቡድኖች አንዱ ሲሆን ዓላማው ወደ ጅማ ዩንቨርስቲ የሚመጡ ክርስትያን ተማሪዎች ወይንም በግቢ ውስጥ ከመጡ በኋላ ክርስትያን የሚሆኑ ተማሪዎች በጸሎት የሚተጉ እንዲሆኑ መርዳት ነው።የቡድኑ አባላት የሚሆኑ ክርስትያን ተማሪዎች በቋሚነት ለህብረቱ በመጸለይ፣ በአጠቃላይ ህብረቱ የጸሎት ጊዜ በመምራት እና የተለያዩ ጸሎት ላይ ትኩረት ያደረጉ ዝግጅቶችን በማዘጋጀት ያገለግላሉ። በግቢ ቆይታችሁ በዚህ አይነት መንገድ በማገልገል ለማደግ እና ለሌሎች በረከት መሆን የምትፈልጉ ሁሉ ይህንን ቡድን እንድትቀላቀሉ በብዙ ፍቅር ተጋብዛችኋል በሁሉ ዐይነት ጸሎትና ልመና፣ በማንኛውም ሁኔታ በመንፈስ ጸልዩ፤ ይህንም በማሰብ ንቁ፤ ስለ ቅዱሳንም ሁሉ በትጋት ልመና አቅርቡ። ኤፌሶን 6፥18' },
  { name: 'የመዘምራን ህብረት/choirs', description: 'ስማችን እንደሚያሳየው ዓላማችን እግዚአብሔርን ከምናመልክባቸው መንገዶች አንዱ በሆነው ( በመዝሙርና በዝማሬ በመንፈሳዊም ቅኔ እርስ በርሳችሁ ተነጋገሩ፤ ለጌታ በልባችሁ ተቀኙና ዘምሩ፤ —ኤፌሶን 5: 19 ) እንደሚል በአንደበታችን ፍሬ በልጁ በኢየሱስ በኩል ስለገለጠልን ማንነቱና ስለሰራልን ስራ እንዲሁም መጽሐፍ ቅዱሳዊ መሠረት ያላቸውን መልዕክቶች የምንዘምርበትና የህብረቱን አዳዲስ መዝሙሮች በአንድነት የምንሰራበት ስፍራችን ነው። በዚህ ህብረት ማገልገል የምትፈልጉ፣ በተለያዩ የዝማሬ ህብረቶች ስታገለግሉ የነበራችሁ፣ ዜማና ግጥም የምትሰሩ፣ ሙዚቃ ምትጫወቱና sound system adjust ምታደርጉ ሁላችሁ ወደዚህ ህብረት በመቀላቀል እግዚአብሔር የሰጣችሁን ስጦታ እንድታሳድጉ ደግሞ እንድታገለግሉበት እንጠራችኋለን።' },
  { name: 'የንጹህ ፍቅር ቡድን/pure love', description: 'የንፁህ ፍቅር ቡድን አላማ በተለያዩ ችግር ውስጥ ያሉ ወገኖቻችንን በመርዳት እና እራሳቸውን እንዲችሉ ድጋፍ በማድረግ የጌታን ፍቅር ማሳየት እና ወንጌልን ማካፈል ፤ እንዲሁም የህብረቱ አባለት በዚህ ስራ ላይ እንዲሳተፉ ማስተባበር ነው። መስጠት ጌታን ደስ የሚያሰኝ እውነተኛ አምልኮ ነው። እኛ የምንሰጠው ደግሞ እግዚአብሔር አስቀድሞ አንድ ልጁን በመስጠት ፍቅሩን በተግባር ስላሳየን ነው። ከእግዚአብሔር የተቀበልነውን ፍቅር ደግሞ እርስ በእርሳችን በመዋደድ በእኛ ውስጥ ያለውን ጌታ ለማያውቁት ልናሳይ ይገባናል። ቡድናችንን ለመቀላቀል የምትፈልጉ ቅዱሳን በሙሉ በፍቅር እንደምንቀበላቹ ልናሳውቃችሁ እንወዳለን ። ከእኛ ጋር ጌታን እያገለገላቹ በመንፈሳዊ ህይወታቹም እንደምትበረቱ ትልቅ ተስፋ አለን። ነገር ግን መልካም ማድረግን ለሌሎችም ማካፈልን አትርሱ፤ እንዲህ ያለው መሥዋዕት እግዚአብሔርን ደስ ያሰኘዋልና። ዕብራውያን 13፤ 6' },
  { name: 'ናታኒም/natanims', description: 'ለህብረት አምልኮ የምንሰባሰብበትን ስፍራ ለአገልግሎት የተመቸ በማድረግ እና በማጽዳት ማገልገል ሲሆን በዚህ ውስጥ እርስ በእርሳችን የክርስቶስን ፍቅርየምንከፋፈልበትና ትህትናን የምንማርበት ስፍራ ነው። እንደዚህ ጌታንና ቅዱሳንን ለማገልገል እና ለመታነጽ የምትፈልጉ የናታኒምን ቡድን እንድትቀላቀሉ ተጋብዛችኋል።' },
  { name: 'የመማክርት ቡድን/counseling', description: 'የcounseling team መጽሐፍ ቅዱስን መሠረት ባደረገ መልኩ በመንፈስ ቅዱስ ኃይል እና ምሪት ላይ በመደገፍ በተለያዩ የህይወት ፈተና ውስጥ ያሉ ቅዱሳን ተማሪዎችን በመምከር ወደ ግባቸው እንዲደርሱ የመርዳት አገልግሎት ላይ የተሰማራ team ነው። የሁሉም ክርስቲያን ግብ እግዚአብሔርን ወደ መምሰል ማደግ ነውና የcounseling team በጅማ ዩንቨርስቲ ያሉ ቅዱሳን በተሰጣቸው ጸጋ ኃጢአተኝነትንና ዓለማዊን ምኞታቸውን ክደው ፥ የተባረከውን ተስፋቸውን እርሱም የኢየሱስ ክርስቶስን ክብር መገለጥ እየጠበቁ፥ ራሳቸውን በመግዛትና በጽድቅ እግዚአብሔርንም በመምሰል በአሁኑ ዘመን እንዲኖሩ ይመክራል፤የተለያዩ ፅሑፎችንና መጽሔቶች በማዘጋጀት ያስተምራል። በመሆኑም በችግር ውስጥ ያሉ ቅዱሳንን በመምከር ጌታችሁን ለማገልገል ሸክም ያላችሁ ቅዱሳን በዚህ መንገድ ለማገልገል እና ደግሞም በዚያ ለማደግ የCounselingን team ተቀላቀሉ እንላችኋለን። የጌታ ጸጋና ሰላም ከእናንተ ጋር ይሁን!!' },
  { name: 'የወንጌል ስርጭት አስተባባሪዎች/action', description: 'The youth group engages young people in various activities and spiritual growth.' },
  { name: 'አዲስ ትውልድ/new generation', description: 'The youth group engages young people in various activities and spiritual growth.' },
  { name: 'አምልኮ/worship', description: 'እግዚአብሔርን ከምናመልክባቸው መንገዶች አንዱ በሆነው ( በመዝሙርና በዝማሬ በመንፈሳዊም ቅኔ እርስ በርሳችሁ ተነጋገሩ፤ ለጌታ በልባችሁ ተቀኙና ዘምሩ፤ —ኤፌሶን 5: 19 ) እንደሚል በአንደበታችን ፍሬ በልጁ በኢየሱስ በኩል ስለገለጠልን ማንነቱና ስለሰራልን ስራ እንዲሁም መጽሐፍ ቅዱሳዊ መሠረት ያላቸውን መልዕክቶች የምንዘምርበትና የህብረቱን አዳዲስ መዝሙሮች በአንድነት የምንሰራበት ስፍራችን ነው። በዚህ ህብረት ማገልገል የምትፈልጉ፣ በተለያዩ የዝማሬ ህብረቶች ስታገለግሉ የነበራችሁ፣ ዜማና ግጥም የምትሰሩ፣ ሙዚቃ ምትጫወቱና sound system adjust ምታደርጉ ሁላችሁ ወደዚህ ህብረት በመቀላቀል እግዚአብሔር የሰጣችሁን ስጦታ እንድታሳድጉ ደግሞ እንድታገለግሉበት እንጠራችኋለን።' },
  { name: 'ስነ ጽሑፍ/Ahava', description: 'Ahava የድራማና የስነ-ጽሁፍ ቡድንየተመሰረተበት ዋና ዓላማ እንደ ስማችን ትርጉም በአርት ዓላማችን የሆነውን እግዚአብሔርን ከፍ አድርጎ ማሳየት የእሱም መልዕክት የሆነውን ወንጌሉን መናገር ነው ስለዚህ ከዚህ በፊት በትወና፤ ግጥም፣ መጣጥፍ፣ ወግ፣ ትያትር እና አጫጭር ድራማዎች፣ ማንኛውም አይነት ፅሁፍ በመፃፍ ስታገለግሉ የነበራችሁ ወይም አሁን በዚህ ማገልገል የምትፈልጉ join us እና team ውስጥ ባሉ ደራሲያን እና art አስተማሪዎች ክህሎቶን ያዳብሩ ::' },
  { name: 'ስለ ቦቱ ሰሪዎች/bot developers', description: 'ይህ ቦት የተሰራው በ 2012 ባች የ software engineering small group ተማሪዎች ነው። God bless you🙏'},
  // Add more departments as needed
];

// Start command handler
const stateStack = [];

bot.start(async (ctx) => {
  const caption = `
    ይህ የ ጅማ ዩኒቨርሲቲ  ኢንጂነሪንግ ግቢ ወንጌላውያን ክርስትያን ተማሪዎች ህብረት ነው። \n\nይህ bot ፌሎሺፑ ስለሚሰጠው አገልግሎት እና በ ፌሎሺፑ ውስጥ ስለሚገኙ ቲሞች መረጃ የሚሰጥ ነው።\n\n ከታች ያሉትን የአግልግሎት ዘርፍች በመጫን መረጃ ማግኘት ይችላሉ።
  `;
  const replyPromise = ctx.reply('ጅማ ዩኒቨርሲቲ  ኢንጂነሪንግ ግቢ ወንጌላውያን ክርስትያን ተማሪዎች ህብረት', Markup.keyboard(departments.map(dep => [dep.name])).resize());
  const photoPromise = ctx.replyWithPhoto({
    source: 'developers.jpg'
  }, {
    caption,
    parse_mode: 'Markdown' // Set the parse_mode to 'Markdown' to enable Markdown formatting
  });

  await Promise.all([photoPromise, replyPromise]);
  stateStack.push('mainMenu')
});


// Department selection handler
bot.hears(departments.map(dep => dep.name), (ctx) => {
  const selectedDepartment = departments.find(dep => dep.name === ctx.message.text);

  if (selectedDepartment) {
    stateStack.push(departments);
    ctx.replyWithMarkdown(` ${selectedDepartment.name}:\n\n${selectedDepartment.description}\n\n`, Markup.inlineKeyboard([
      // Markup.button.callback('መልስ', 'backToTeams'),
      Markup.button.callback('ወደ ዋናው ገፅ', 'mainMenu'),
    ]));
  } else {
    ctx.reply('Invalid department selection. Please choose a department from the provided options.');
  }
});

// Handle inline keyboard button callbacks
bot.action('backToMainMenu', (ctx) => {
  // Pop the current state from the stack
  stateStack.pop();

  // Perform action based on the previous state
  const previousState = stateStack.pop();
  if (previousState === 'mainMenu') {
    // If previous state was the main menu, return to main menu
    ctx.reply('You clicked the "Back" button. Returning to Main Menu.');
    // Push the main menu state back to the stack
    stateStack.push('mainMenu');
  } else {
    // Handle other cases or states here...
    ctx.reply('You clicked the "Back" button. Returning to previous state.');
  }
});

bot.action('mainMenu', (ctx) => {
  // Clear the state stack and return to main menu
  stateStack.length = 0;
  stateStack.push('mainMenu');

  // Implement your logic to return to the department selection part
  const caption = `
    ይህ የ ጅማ ዩኒቨርሲቲ  ኢንጂነሪንግ ግቢ ወንጌላውያን ክርስትያን ተማሪዎች ህብረት ነው። \n\nይህ bot ፌሎሺፑ ስለሚሰጠው አገልግሎት እና በ ፌሎሺፑ ውስጥ ስለሚገኙ ቲሞች መረጃ የሚሰጥ ነው።\n\n ከታች ያሉትን የአግልግሎት ዘርፍች በመጫን መረጃ ማግኘት ይችላሉ።
  `;
  const replyPromise = ctx.reply('ጅማ ዩኒቨርሲቲ  ኢንጂነሪንግ ግቢ ወንጌላውያን ክርስትያን ተማሪዎች ህብረት', Markup.keyboard(departments.map(dep => [dep.name])).resize());
  const photoPromise = ctx.replyWithPhoto({
    source: 'developers.jpg'
  }, {
    caption,
    parse_mode: 'Markdown' // Set the parse_mode to 'Markdown' to enable Markdown formatting
  });

  Promise.all([photoPromise, replyPromise]);
});

// Start the bot

bot.launch().then(() => {
  console.log('Bot started successfully!');
}).catch((err) => {
  console.error('Error starting bot:', err);
});