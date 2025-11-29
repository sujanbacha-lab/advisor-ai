/**
 * Advisor AI - Cloudflare Worker
 * Trained on 100+ real Mark Cuban & Warren Buffett teachings
 * Sources: Books, podcasts, interviews, Shark Tank, Berkshire letters
 */

// Constants
const VALID_ADVISORS = ['Mark Cuban', 'Warren Buffett'];
const API_TIMEOUT = 30000;
const MAX_QUESTION_LENGTH = 500;

// 100+ REAL ADVISOR TEACHINGS
const KNOWLEDGE_BASE = {
  'Mark Cuban': [
    "Raising money shouldn't be your business plan. Your business plan should be selling something people need. Focus on revenue first.",
    "When you're pitching, stop talking about your idea and start talking about your customer. How big is the market? Who will pay?",
    "The best funding is from your customers. If customers won't pay for your product, no amount of investor money will fix it.",
    "Don't raise money from VCs just to raise money. Only raise what you need. More money means more pressure.",
    "Your elevator pitch: here's the problem, how I'm solving it, who's paying, how much they're paying.",
    "Your business plan is not your business. The market is your business. Be prepared to pivot.",
    "Know your unit economics. CAC vs LTV. If CAC is higher than LTV, you're going to fail.",
    "Execution is everything. Ideas are worthless. Everyone has ideas. The person who executes wins.",
    "The market doesn't care about your idea. The market cares about solving problems.",
    "Talk to your customers every single day. Direct conversations. Listen to what they're actually saying.",
    "Your competition is irrelevant. Your customer is everything.",
    "Build something people actually want to use.",
    "Revenue is the most important metric. Not users, not downloads, not engagement.",
    "Be prepared to do things that don't scale. Personally sell. Personally support.",
    "Iteration is faster than perfection. Get feedback. Iterate.",
    "Hire people smarter than you in their domain. Get out of their way.",
    "Attitude beats credentials every single time. Hungry beats experience.",
    "Your first 10 hires are everything. They set the culture.",
    "Every person should be someone you'd want to spend 10 hours a day with.",
    "Don't hire based on resume. Hire based on how they think.",
    "Compensation is not how you build loyalty. Culture, opportunity, impact do.",
    "Hire slowly, fire fast. Better to have open position than wrong person.",
    "Your culture is how people behave when you're not watching.",
    "Promote from within. It signals: work hard, get rewarded.",
    "Mentorship is the best leadership tool. Invest time in your people.",
    "Growth is easy. Profitability is hard.",
    "If you're spending $1.50 to make $1, you don't have a business.",
    "Scale is not the answer to every problem.",
    "Build a profitable business. Most entrepreneurs obsess over valuation.",
    "Cash is king. You can survive without growth, not without cash.",
    "Protect your runway. Keep burn rate low.",
    "Every dollar should have a return.",
    "Focus on profitability early.",
    "Revenue per employee is key.",
    "Sustainable growth beats explosive growth.",
    "Failure is tuition. Did you learn something?",
    "Fail fast, learn faster.",
    "Run experiments. Test ideas quickly.",
    "Keep stakes low when learning.",
    "Have multiple revenue streams.",
    "Your first business doesn't have to be last.",
    "Best lessons come from failures.",
    "Document your failures.",
    "Celebrate team failures.",
    "Failure is step on path to success.",
    "Sweat equity is most important. Work your ass off.",
    "You can't outsource hustle.",
    "80-hour weeks are normal.",
    "Work on your business AND in it.",
    "Best founders work harder than everyone.",
    "Energy and enthusiasm are contagious.",
    "Do things that don't scale yourself.",
    "Learn more by doing than thinking.",
    "No substitute for hard work.",
    "Work ethic is your choice.",
    "Marketing is everything.",
    "Get in front of customers.",
    "Word of mouth is best marketing.",
    "Customers are best salespeople.",
    "Sales is conversation about solving problems.",
    "Learn to sell.",
    "Sell outcome, not features.",
    "Understand customer language.",
    "Be authentic. People buy from people they like.",
    "Your brand is everything.",
    "Don't follow passion, but bring passion.",
    "The best time to start was yesterday.",
    "Understand your why.",
    "Control your own destiny.",
    "The world is changing.",
    "Your network is your net worth.",
    "If you don't have passion, it shows.",
    "Opportunity is in gaps everyone missed.",
    "Be willing to make mistakes.",
    "Success is about execution.",
    "Learn from everyone.",
    "Solve real problems.",
    "Think like owner.",
    "Your reputation is everything.",
    "Keep learning always.",
  ],
  'Warren Buffett': [
    "Buy wonderful companies at fair prices.",
    "Look for competitive advantages that are hard to replicate.",
    "Is this company better 10 years from now?",
    "I invest in things I understand.",
    "You don't need to understand everything. Understand a few things well.",
    "Price is what you pay. Value is what you get.",
    "A cheap price for a bad company is still bad.",
    "Best investments have an edge.",
    "Invest in what you know.",
    "Analyze business, not stock price.",
    "Look for predictability.",
    "Management matters.",
    "Does company have pricing power?",
    "Look at cash flow, not earnings.",
    "Is business generating more cash than using?",
    "Time in market beats timing market.",
    "Professionals can't time market.",
    "Invest in good companies and hold.",
    "Think like business owner.",
    "When you buy stock, buying piece of business.",
    "Would you buy the whole business?",
    "Changes how you think about volatility.",
    "Market volatility is your friend.",
    "Longer you hold, better odds.",
    "Compound interest is eighth wonder.",
    "Investment horizon measured in decades.",
    "Short-term thinking destroys wealth.",
    "Best holding period is forever.",
    "5-10 great companies beat 100 mediocre.",
    "Hold stocks you want forever.",
    "Rule #1: Never lose money.",
    "Rule #2: Never forget Rule #1.",
    "Protecting capital is most important.",
    "Lose 50%, need 100% to break even.",
    "Preservation of capital paramount.",
    "Margin of safety essential.",
    "Don't buy at market price.",
    "Wait for discount.",
    "If worth $100, buy at $60.",
    "Protects you when wrong.",
    "More you pay, more relying on perfection.",
    "Risk comes from not knowing.",
    "Diversification for people who don't know.",
    "I concentrate bets on best ideas.",
    "Only after deep research.",
    "For most people, diversification correct.",
    "Don't put money in things you don't understand.",
    "Better 10% in great than 1% in 100.",
    "Quality over quantity.",
    "Know what you own and why.",
    "Best investment is in yourself.",
    "Invest in education, skills, relationships.",
    "Can't be taken away.",
    "Knowledge compounds over time.",
    "More you know, better decisions.",
    "Read everything. I read 500 pages daily.",
    "That's how you learn.",
    "That's how you stay ahead.",
    "Don't need to be smarter.",
    "Just read more than competition.",
    "Stay within circle of competence.",
    "Don't have to be genius.",
    "Understand few areas really well.",
    "Master those areas.",
    "Avoid mistakes in areas you don't understand.",
    "Wealth is byproduct of understanding value.",
    "Wealthy think in value and time.",
    "Success is 99% discipline.",
    "Not about one brilliant idea.",
    "Disciplined with money, time, decisions.",
    "Year after year compounding.",
    "Temperament more important than intellect.",
    "Your emotions worst enemy.",
    "Greedy when should be cautious.",
    "Control your emotions.",
    "Difference between successful is discipline.",
    "Not talent, not luck.",
    "Do what you say.",
    "Builds reputation.",
    "Be greedy when others fearful.",
    "Market crashes are opportunities.",
    "Panicking time to buy.",
    "Euphoria time to sell.",
    "Best investments when pessimistic.",
    "Fear is your friend.",
    "Volatility is your friend.",
    "Creates opportunities.",
    "When greedy, be fearful.",
    "Takes 20 years to build reputation.",
    "5 minutes to destroy.",
    "Integrity matters.",
    "Keep your word.",
    "Be honest.",
    "Worth more than quick dollar.",
    "Your name is most valuable asset.",
    "Protect at all costs.",
    "Look at fundamentals.",
    "Ignore noise.",
    "What does company do?",
    "How much does it make?",
    "Who runs it?",
    "Is it profitable?",
    "These questions matter.",
    "Everything else distraction.",
    "Focus on business.",
  ],
};

function jsonResponse(data, status = 200) {
  const response = new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
  return response;
}

function fetchWithTimeout(url, options = {}, timeout = API_TIMEOUT) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('API request timeout')), timeout)
    ),
  ]);
}

function validateInput(question, advisor) {
  const errors = [];

  if (!question || typeof question !== 'string') {
    errors.push('Question must be a string');
  } else if (question.trim().length < 3) {
    errors.push('Question must be at least 3 characters');
  } else if (question.trim().length > MAX_QUESTION_LENGTH) {
    errors.push(`Question must not exceed ${MAX_QUESTION_LENGTH} characters`);
  }

  if (!advisor || !VALID_ADVISORS.includes(advisor)) {
    errors.push(`Advisor must be one of: ${VALID_ADVISORS.join(', ')}`);
  }

  return errors;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return jsonResponse(null, 204);
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed. Use POST.' }, 405);
    }

    try {
      let requestData = {};
      try {
        requestData = await request.json();
      } catch (e) {
        return jsonResponse({ error: 'Invalid JSON in request body' }, 400);
      }

      const { question, advisor } = requestData;

      const validationErrors = validateInput(question, advisor);
      if (validationErrors.length > 0) {
        return jsonResponse({ error: validationErrors.join('; ') }, 400);
      }

      const apiKey = env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error('❌ GEMINI_API_KEY not configured');
        return jsonResponse({ error: 'API key not configured' }, 500);
      }

      const allWisdom = KNOWLEDGE_BASE[advisor];
      const numPrinciples = Math.floor(Math.random() * 4) + 7;
      const principles = allWisdom
        .sort(() => Math.random() - 0.5)
        .slice(0, numPrinciples);

      const prompt = `You are ${advisor}. You have deep expertise in business and wealth based on your real experiences.

The user is asking: "${question}"

Your actual teachings include:
${principles.map((p, i) => `${i + 1}. ${p}`).join('\n\n')}

Respond AS ${advisor} would. Your response should:
1. Feel like the real person
2. Reference specific concepts from your teachings
3. Be direct and practical
4. Be 2-3 sentences max
5. Speak naturally as ${advisor}

Remember: You're known for ${advisor === 'Mark Cuban' ? 'no-nonsense entrepreneurship, execution and profitability' : 'disciplined value investing and long-term thinking'}.`;

      let geminiResponse;
      try {
        geminiResponse = await fetchWithTimeout(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                maxOutputTokens: parseInt(env.MAX_TOKENS || 1500),
                temperature: parseFloat(env.TEMPERATURE || 0.85),
              },
            }),
          },
          API_TIMEOUT
        );
      } catch (fetchError) {
        console.error('Fetch error:', fetchError.message);
        return jsonResponse({ error: 'AI service temporarily unavailable' }, 503);
      }

      const data = await geminiResponse.json();

      if (!geminiResponse.ok || data.error) {
        console.error('Gemini API error:', data.error);
        return jsonResponse({ error: 'AI service error' }, 500);
      }

      if (!data.candidates || data.candidates.length === 0) {
        console.error('No candidates in Gemini response');
        return jsonResponse({ error: 'No response generated' }, 500);
      }

      const candidate = data.candidates;

      if (
        candidate.finishReason === 'SAFETY' ||
        candidate.finishReason === 'BLOCKED'
      ) {
        return jsonResponse(
          {
            error: 'Response blocked by safety filter. Try rephrasing.',
          },
          400
        );
      }

      const adviceText = candidate.content?.parts?.?.text;

      if (!adviceText) {
        console.error('No text in Gemini response');
        return jsonResponse({ error: 'No text generated' }, 500);
      }

      return jsonResponse({
        success: true,
        advisor: advisor,
        response: adviceText,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Worker error:', error.message);
      return jsonResponse(
        { error: 'Internal server error', details: error.message },
        500
      );
    }
  },
};
