from django.core.management.base import BaseCommand
from core.models import DailyVerse


VERSES = [
    {
        "text_en": "For God so loved the world, that he gave his only Son",
        "text_ru": "Ибо так возлюбил Бог мир, что отдал Сына Своего единородного",
        "text_he": "כִּי-כָּכָה אָהַב אֱלֹהִים אֶת-הָעוֹלָם, עַד-כִּי נָתַן אֶת-בְּנוֹ יְחִידוֹ",
        "reference_en": "John 3:16", "reference_ru": "Иоанна 3:16", "reference_he": "יוחנן ג׳:טז",
    },
    {
        "text_en": "I am the way, and the truth, and the life",
        "text_ru": "Я есмь путь и истина и жизнь",
        "text_he": "אֲנִי הַדֶּרֶךְ וְהָאֱמֶת וְהַחַיִּים",
        "reference_en": "John 14:6", "reference_ru": "Иоанна 14:6", "reference_he": "יוחנן י״ד:6",
    },
    {
        "text_en": "The Lord is my shepherd; I shall not want",
        "text_ru": "Господь — Пастырь мой; я ни в чём не буду нуждаться",
        "text_he": "יְהוָה רֹעִי לֹא אֶחְסָר",
        "reference_en": "Psalm 23:1", "reference_ru": "Псалом 22:1", "reference_he": "תהלים כ״ג:א",
    },
    {
        "text_en": "Trust in the Lord with all your heart, and do not lean on your own understanding",
        "text_ru": "Надейся на Господа всем сердцем твоим, и не полагайся на разум твой",
        "text_he": "בְּטַח אֶל-יְהוָה בְּכָל-לִבֶּךָ וְאֶל-בִּינָתְךָ אַל-תִּשָּׁעֵן",
        "reference_en": "Proverbs 3:5", "reference_ru": "Притчи 3:5", "reference_he": "משלי ג׳:ה",
    },
    {
        "text_en": "I can do all things through him who strengthens me",
        "text_ru": "Всё могу в укрепляющем меня Иисусе Христе",
        "text_he": "כֹּל אוּכַל בַּמָּשִׁיחַ הַמְאַמְּצֵנִי",
        "reference_en": "Philippians 4:13", "reference_ru": "Филиппийцам 4:13", "reference_he": "פיליפים ד׳:יג",
    },
    {
        "text_en": "Be still, and know that I am God",
        "text_ru": "Остановитесь и познайте, что Я — Бог",
        "text_he": "הַרְפּוּ וּדְעוּ כִּי-אָנֹכִי אֱלֹהִים",
        "reference_en": "Psalm 46:10", "reference_ru": "Псалом 45:11", "reference_he": "תהלים מ״ו:י",
    },
    {
        "text_en": "The Lord is my light and my salvation; whom shall I fear?",
        "text_ru": "Господь — свет мой и спасение моё: кого мне бояться?",
        "text_he": "יְהוָה אוֹרִי וְיִשְׁעִי מִמִּי אִירָא",
        "reference_en": "Psalm 27:1", "reference_ru": "Псалом 26:1", "reference_he": "תהלים כ״ז:א",
    },
    {
        "text_en": "Come to me, all who labor and are heavy laden, and I will give you rest",
        "text_ru": "Придите ко Мне все труждающиеся и обременённые, и Я успокою вас",
        "text_he": "בּוֹאוּ אֵלַי כָּל-הַיְגֵעִים וְהַעֲמֵסִים וַאֲנִי אָנִיחַ לָכֶם",
        "reference_en": "Matthew 11:28", "reference_ru": "Матфея 11:28", "reference_he": "מתי י״א:כח",
    },
    {
        "text_en": "For I know the plans I have for you, plans for welfare and not for evil",
        "text_ru": "Ибо только Я знаю намерения, какие имею о вас... намерения во благо",
        "text_he": "כִּי אָנֹכִי יָדַעְתִּי אֶת-הַמַּחֲשָׁבֹת אֲשֶׁר אָנֹכִי חֹשֵׁב עֲלֵיכֶם",
        "reference_en": "Jeremiah 29:11", "reference_ru": "Иеремии 29:11", "reference_he": "ירמיהו כ״ט:יא",
    },
    {
        "text_en": "Love is patient and kind; love does not envy or boast",
        "text_ru": "Любовь долготерпит, милосердствует, любовь не завидует, не превозносится",
        "text_he": "הָאַהֲבָה מַאֲרִיכָה רוּחַ וּמֵטִיבָה",
        "reference_en": "1 Corinthians 13:4", "reference_ru": "1 Коринфянам 13:4", "reference_he": "קורינתים א׳ י״ג:ד",
    },
    {
        "text_en": "But those who wait for the Lord shall renew their strength",
        "text_ru": "А надеющиеся на Господа обновятся в силе",
        "text_he": "וְקוֹיֵ יְהוָה יַחֲלִיפוּ כֹחַ",
        "reference_en": "Isaiah 40:31", "reference_ru": "Исаии 40:31", "reference_he": "ישעיהו מ׳:לא",
    },
    {
        "text_en": "The Lord is near to the brokenhearted and saves the crushed in spirit",
        "text_ru": "Близок Господь к сокрушённым сердцем и смиренных духом спасёт",
        "text_he": "קָרוֹב יְהוָה לְנִשְׁבְּרֵי-לֵב",
        "reference_en": "Psalm 34:18", "reference_ru": "Псалом 33:19", "reference_he": "תהלים ל״ד:יט",
    },
    {
        "text_en": "For by grace you have been saved through faith, and that not of yourselves",
        "text_ru": "Ибо благодатью вы спасены через веру, и сие не от вас",
        "text_he": "כִּי בְחֶסֶד נוֹשַׁעְתֶּם עַל-יְדֵי הָאֱמוּנָה",
        "reference_en": "Ephesians 2:8", "reference_ru": "Ефесянам 2:8", "reference_he": "אפסים ב׳:ח",
    },
    {
        "text_en": "Do not be anxious about anything, but in everything by prayer let your requests be known to God",
        "text_ru": "Не заботьтесь ни о чём, но всегда в молитве... открывайте свои желания пред Богом",
        "text_he": "אַל תִּדְאֲגוּ לְשׁוּם דָּבָר",
        "reference_en": "Philippians 4:6", "reference_ru": "Филиппийцам 4:6", "reference_he": "פיליפים ד׳:ו",
    },
    {
        "text_en": "This is the day that the Lord has made; let us rejoice and be glad in it",
        "text_ru": "Сей день сотворил Господь: возрадуемся и возвеселимся в оный",
        "text_he": "זֶה-הַיּוֹם עָשָׂה יְהוָה נָגִילָה וְנִשְׂמְחָה בוֹ",
        "reference_en": "Psalm 118:24", "reference_ru": "Псалом 117:24", "reference_he": "תהלים קי״ח:כד",
    },
    {
        "text_en": "Cast all your anxieties on him, because he cares for you",
        "text_ru": "Все заботы ваши возложите на Него, ибо Он печётся о вас",
        "text_he": "הַשְׁלִיכוּ עָלָיו כָּל-דְּאֲגַתְכֶם כִּי הוּא יָדַאג לָכֶם",
        "reference_en": "1 Peter 5:7", "reference_ru": "1 Петра 5:7", "reference_he": "פטרוס א׳ ה׳:ז",
    },
    {
        "text_en": "The joy of the Lord is your strength",
        "text_ru": "Радость пред Господом — сила ваша",
        "text_he": "חֶדְוַת יְהוָה הִיא מָעֻזְּכֶם",
        "reference_en": "Nehemiah 8:10", "reference_ru": "Неемии 8:10", "reference_he": "נחמיה ח׳:י",
    },
    {
        "text_en": "Delight yourself in the Lord, and he will give you the desires of your heart",
        "text_ru": "Утешайся Господом, и Он исполнит желания сердца твоего",
        "text_he": "וְהִתְעַנַּג עַל-יְהוָה וְיִתֶּן-לְךָ מִשְׁאֲלֹת לִבֶּךָ",
        "reference_en": "Psalm 37:4", "reference_ru": "Псалом 36:4", "reference_he": "תהלים ל״ז:ד",
    },
    {
        "text_en": "For God gave us a spirit not of fear but of power and love and self-control",
        "text_ru": "Ибо дал нам Бог духа не боязни, но силы и любви и целомудрия",
        "text_he": "כִּי לֹא רוּחַ מוֹרָא נָתַן לָנוּ אֱלֹהִים כִּי אִם רוּחַ גְּבוּרָה וְאַהֲבָה",
        "reference_en": "2 Timothy 1:7", "reference_ru": "2 Тимофею 1:7", "reference_he": "טימותיאוס ב׳ א׳:ז",
    },
    {
        "text_en": "And we know that for those who love God all things work together for good",
        "text_ru": "Притом знаем, что любящим Бога, всё содействует ко благу",
        "text_he": "וְאָנוּ יוֹדְעִים כִּי לְאֹהֲבֵי אֱלֹהִים הַכֹּל עוֹזֵר לְטוֹב",
        "reference_en": "Romans 8:28", "reference_ru": "Римлянам 8:28", "reference_he": "רומים ח׳:כח",
    },
    {
        "text_en": "The name of the Lord is a strong tower; the righteous man runs into it and is safe",
        "text_ru": "Башня твёрдая — имя Господа; убегает в неё праведник — и безопасен",
        "text_he": "מִגְדַּל-עֹז שֵׁם יְהוָה בּוֹ-יָרוּץ צַדִּיק וְנִשְׂגָּב",
        "reference_en": "Proverbs 18:10", "reference_ru": "Притчи 18:10", "reference_he": "משלי י״ח:י",
    },
    {
        "text_en": "Blessed are the pure in heart, for they shall see God",
        "text_ru": "Блаженны чистые сердцем, ибо они Бога узрят",
        "text_he": "אַשְׁרֵי בְּרֵי הַלֵּב כִּי הֵם יִרְאוּ אֶת-הָאֱלֹהִים",
        "reference_en": "Matthew 5:8", "reference_ru": "Матфея 5:8", "reference_he": "מתי ה׳:ח",
    },
    {
        "text_en": "In the beginning was the Word, and the Word was with God, and the Word was God",
        "text_ru": "В начале было Слово, и Слово было у Бога, и Слово было Бог",
        "text_he": "בְּרֵאשִׁית הָיָה הַדָּבָר וְהַדָּבָר הָיָה אֵצֶל הָאֱלֹהִים וֵאלֹהִים הָיָה הַדָּבָר",
        "reference_en": "John 1:1", "reference_ru": "Иоанна 1:1", "reference_he": "יוחנן א׳:א",
    },
    {
        "text_en": "Ask, and it will be given to you; seek, and you will find",
        "text_ru": "Просите, и дано будет вам; ищите, и найдёте",
        "text_he": "שַׁאֲלוּ וְיִנָּתֵן לָכֶם דִּרְשׁוּ וְתִמְצְאוּ",
        "reference_en": "Matthew 7:7", "reference_ru": "Матфея 7:7", "reference_he": "מתי ז׳:ז",
    },
    {
        "text_en": "The Lord will fight for you, and you have only to be silent",
        "text_ru": "Господь будет сражаться за вас, а вы будьте спокойны",
        "text_he": "יְהוָה יִלָּחֵם לָכֶם וְאַתֶּם תַּחֲרִישׁוּן",
        "reference_en": "Exodus 14:14", "reference_ru": "Исход 14:14", "reference_he": "שמות י״ד:יד",
    },
    {
        "text_en": "Rejoice always, pray without ceasing, give thanks in all circumstances",
        "text_ru": "Всегда радуйтесь. Непрестанно молитесь. За всё благодарите",
        "text_he": "שִׂמְחוּ בְּכָל-עֵת הִתְפַּלְלוּ בְּלִי הֶרֶף וְהוֹדוּ בְּכָל-דָּבָר",
        "reference_en": "1 Thessalonians 5:16-18", "reference_ru": "1 Фессалоникийцам 5:16-18", "reference_he": "תסלוניקים א׳ ה׳:טז-יח",
    },
    {
        "text_en": "God is our refuge and strength, a very present help in trouble",
        "text_ru": "Бог нам прибежище и сила, скорый помощник в бедах",
        "text_he": "אֱלֹהִים לָנוּ מַחֲסֶה וָעֹז עֶזְרָה בְצָרוֹת נִמְצָא מְאֹד",
        "reference_en": "Psalm 46:1", "reference_ru": "Псалом 45:2", "reference_he": "תהלים מ״ו:ב",
    },
    {
        "text_en": "Let your light shine before others, so that they may see your good works",
        "text_ru": "Так да светит свет ваш пред людьми, чтобы они видели ваши добрые дела",
        "text_he": "כֵּן יָאִיר אוֹרְכֶם לִפְנֵי הָאָדָם לְמַעַן יִרְאוּ מַעֲשֵׂיכֶם הַטּוֹבִים",
        "reference_en": "Matthew 5:16", "reference_ru": "Матфея 5:16", "reference_he": "מתי ה׳:טז",
    },
    {
        "text_en": "For the Son of Man came to seek and to save the lost",
        "text_ru": "Ибо Сын Человеческий пришёл взыскать и спасти погибшее",
        "text_he": "כִּי בֶן-הָאָדָם בָּא לְבַקֵּשׁ וּלְהוֹשִׁיעַ אֶת-הָאֹבֵד",
        "reference_en": "Luke 19:10", "reference_ru": "Луки 19:10", "reference_he": "לוקס י״ט:י",
    },
    {
        "text_en": "Peace I leave with you; my peace I give to you",
        "text_ru": "Мир оставляю вам, мир Мой даю вам",
        "text_he": "שָׁלוֹם אַנִּיחַ לָכֶם אֶת-שְׁלוֹמִי אֶתֵּן לָכֶם",
        "reference_en": "John 14:27", "reference_ru": "Иоанна 14:27", "reference_he": "יוחנן י״ד:כז",
    },
    {
        "text_en": "Draw near to God, and he will draw near to you",
        "text_ru": "Приблизьтесь к Богу, и приблизится к вам",
        "text_he": "הִתְקָרְבוּ אֶל-אֱלֹהִים וְיִתְקָרֵב אֲלֵיכֶם",
        "reference_en": "James 4:8", "reference_ru": "Иакова 4:8", "reference_he": "יעקב ד׳:ח",
    },
    {
        "text_en": "For God so loved that He gave His only Son, that whoever believes should not perish",
        "text_ru": "Так возлюбил Бог мир, что отдал Сына Своего, дабы всякий верующий не погиб",
        "text_he": "כִּי-כָּכָה אָהַב אֱלֹהִים כִּי כָּל-הַמַּאֲמִין לֹא יֹאבַד",
        "reference_en": "John 3:16b", "reference_ru": "Иоанна 3:16б", "reference_he": "יוחנן ג׳:טז",
    },
    {
        "text_en": "Fear not, for I am with you; be not dismayed, for I am your God",
        "text_ru": "Не бойся, ибо Я с тобою; не смущайся, ибо Я Бог твой",
        "text_he": "אַל-תִּירָא כִּי עִמְּךָ-אָנִי אַל-תִּשְׁתָּע כִּי-אֲנִי אֱלֹהֶיךָ",
        "reference_en": "Isaiah 41:10", "reference_ru": "Исаии 41:10", "reference_he": "ישעיהו מ״א:י",
    },
    {
        "text_en": "Create in me a clean heart, O God, and renew a right spirit within me",
        "text_ru": "Сердце чистое сотвори во мне, Боже, и дух правый обнови внутри меня",
        "text_he": "לֵב טָהוֹר בְּרָא-לִי אֱלֹהִים וְרוּחַ נָכוֹן חַדֵּשׁ בְּקִרְבִּי",
        "reference_en": "Psalm 51:10", "reference_ru": "Псалом 50:12", "reference_he": "תהלים נ״א:יב",
    },
    {
        "text_en": "But seek first the kingdom of God and his righteousness",
        "text_ru": "Ищите же прежде Царства Божия и правды Его",
        "text_he": "וְאַתֶּם בַּקְּשׁוּ בָרִאשׁוֹנָה אֶת-מַלְכוּת אֱלֹהִים וְאֶת-צִדְקָתוֹ",
        "reference_en": "Matthew 6:33", "reference_ru": "Матфея 6:33", "reference_he": "מתי ו׳:לג",
    },
    {
        "text_en": "The Lord bless you and keep you; the Lord make his face shine upon you",
        "text_ru": "Да благословит тебя Господь и сохранит тебя! Да призрит на тебя Господь светлым лицем Своим",
        "text_he": "יְבָרֶכְךָ יְהוָה וְיִשְׁמְרֶךָ יָאֵר יְהוָה פָּנָיו אֵלֶיךָ",
        "reference_en": "Numbers 6:24-25", "reference_ru": "Числа 6:24-25", "reference_he": "במדבר ו׳:כד-כה",
    },
    {
        "text_en": "Great is the Lord, and greatly to be praised",
        "text_ru": "Велик Господь и достохвален",
        "text_he": "גָּדוֹל יְהוָה וּמְהֻלָּל מְאֹד",
        "reference_en": "Psalm 145:3", "reference_ru": "Псалом 144:3", "reference_he": "תהלים קמ״ה:ג",
    },
    {
        "text_en": "Behold, I am doing a new thing; now it springs forth, do you not perceive it?",
        "text_ru": "Вот, Я делаю новое; ныне же оно явится; неужели вы и этого не хотите знать?",
        "text_he": "הִנְנִי עֹשֶׂה חֲדָשָׁה עַתָּה תִצְמָח הֲלוֹא תֵדָעוּהָ",
        "reference_en": "Isaiah 43:19", "reference_ru": "Исаии 43:19", "reference_he": "ישעיהו מ״ג:יט",
    },
]


class Command(BaseCommand):
    help = 'Loads a starter set of daily verses in three languages'

    def handle(self, *args, **kwargs):
        created = 0
        for v in VERSES:
            obj, is_created = DailyVerse.objects.get_or_create(
                reference_en=v['reference_en'],
                defaults={
                    'text_en': v['text_en'],
                    'text_ru': v['text_ru'],
                    'text_he': v['text_he'],
                    'reference_ru': v['reference_ru'],
                    'reference_he': v['reference_he'],
                    'is_active': True,
                }
            )
            if is_created:
                created += 1
        self.stdout.write(self.style.SUCCESS(f'Loaded {created} new verses (out of {len(VERSES)} total in list).'))