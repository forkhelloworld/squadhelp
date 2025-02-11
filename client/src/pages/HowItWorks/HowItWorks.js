import React from 'react'
import styles from './HowItWorks.module.scss'

const HowItWorks = () => {
  return (
    <div className={styles.page}>
      <header className={styles['site-header']}>
        <div className={styles.wrapper}>
          <a href='/'>
            <img
              src='https://img.atom.com/public/images/atom-logo.png'
              className={styles.logo}
              alt='logo'
            />
          </a>
          <div className={styles.mid}>
            <nav className={styles['head-nav']}>
              <ul>
                <li>
                  <a href='#names-for-sale'>Names For Sale</a>
                  <span className={styles.arrow}></span>
                  <ul className={styles.menu}>
                    <li>Premium Domains</li>
                    <li>Domain Auction</li>
                    <li>Short Domains</li>
                    <li>3 Letter Domains</li>
                    <li>4 Letter Domains</li>
                    <li>5 Letter Domains</li>
                    <li>One Word Domains</li>
                  </ul>
                </li>
                <li>
                  <a href='#naming-contests'>Naming Contests</a>
                  <span className={styles.arrow}></span>
                  <ul className={styles.menu}>
                    <li>Naming Contests</li>
                    <li>Start A Contest</li>
                    <li>How It Works</li>
                    <li>Contest Pricing</li>
                    <li>Agency Services</li>
                    <li>Our Work</li>
                    <li>Recent Winners</li>
                    <li>Active Contests</li>
                    <li>Become A Creative</li>
                  </ul>
                </li>
                <li>
                  <a href='#other-services'>Other Services</a>
                  <span className={styles.arrow}></span>
                  <ul className={styles.menu}>
                    <li>Other Services</li>
                    <li>Logo Contest</li>
                    <li>Tagline Contest</li>
                    <li>Brand Identity Design</li>
                    <li>Audience Testing</li>
                    <li>Trademark Filing</li>
                    <li>Trademark Research</li>
                  </ul>
                </li>
                <li>
                  <a href='#agency-experience'>Agency Experience</a>
                </li>
                <li>
                  <a href='#resources'>Resources</a>
                  <span className={styles.arrow}></span>
                  <ul className={styles.menu}>
                    <li>Resources</li>
                    <li>Business Name Generator</li>
                    <li>Domain Name Generator</li>
                    <li>Domain Appraisal Tool</li>
                    <li>Brand Alignment Tool</li>
                    <li>Free Trademark Checker</li>
                    <li>Startup Toolkit</li>
                    <li>Blog</li>
                    <li>Our Work</li>
                    <li>Testimonials</li>
                    <li>Partner With Us</li>
                    <li>AtomRadar</li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles['header-right']}>
            <img src='https://www.atom.com/html/html/html/static_images/icon-search.svg' />
            <img src='https://www.atom.com/html/html/html/static_images/icon-user.svg' />
            <img src='https://www.atom.com/html/html/html/static_images/icon-phone.svg' />
            <img src='https://www.atom.com/html/html/html/static_images/icon-heart.svg' />
          </div>
        </div>
      </header>
      <main>
        <section className={styles['how-does-work-section']}>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <h4>World's #1 Naming Platform</h4>
              <h1>How Does Atom Work?</h1>
              <p>
                Atom helps you come up with a great name for your business by
                combining the power of crowdsourcing with sophisticated
                technology and Agency-level validation services.
              </p>
            </div>
            <div className={styles.right}>
              <div className={styles.video}>
                <iframe
                  src='https://iframe.mediadelivery.net/embed/239474/327efcdd-b1a2-4891-b274-974787ae8362?autoplay=false&amp;loop=false&amp;muted=false&amp;preload=true&amp;responsive=true'
                  allow='accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;'
                  allowfullscreen='true'
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        <section className={styles['ways-to-use']}>
          <div className={styles.wrapper}>
            <div className={styles.caption}>
              <h4>Our Services</h4>
              <h2>3 Ways To Use Atom</h2>
              <p>
                Atom offers 3 ways to get you a perfect name for your business.
              </p>
            </div>
            <div className={styles['cards-container']}>
              <div className={styles.card}>
                <div>
                  <img src='https://www.atom.com/html/html/static_images/contests/g1.svg' />
                  <h3>Launch a Contest</h3>
                  <p>
                    Work with hundreds of creative experts to get custom name
                    suggestions for your business or brand. All names are
                    auto-checked for URL availability.
                  </p>
                </div>
                <div className={styles.btn}>
                  <a>
                    Launch a Contest <span></span>
                  </a>
                </div>
              </div>
              <div className={styles.card}>
                <div>
                  <img src='https://www.atom.com/html/html/static_images/contests/g2.svg' />
                  <h3>Explore Names For Sale</h3>
                  <p>
                    Our branding team has curated thousands of pre-made names
                    that you can purchase instantly. All names include a
                    matching URL and a complimentary Logo Design.
                  </p>
                </div>
                <div className={styles.btn}>
                  <a>
                    Explore Names For Sale <span></span>
                  </a>
                </div>
              </div>
              <div className={styles.card}>
                <div>
                  <img src='https://www.atom.com/html/html/static_images/contests/g3.svg' />
                  <h3>Agency-level Managed Contests</h3>
                  <p>
                    Our Managed contests combine the power of crowdsourcing with
                    the rich experience of our branding consultants. Get a
                    complete agency-level experience at a fraction of Agency
                    costs.
                  </p>
                </div>
                <div className={styles.btn}>
                  <a>
                    Learn More
                    <span></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles['contest-steps']}>
          <div className={styles.wrapper}>
            <div className={styles.caption}>
              <img src='https://www.atom.com/resources/assets/svg/icons/icon-27.svg' />
              <h3>How Do Naming Contests Work?</h3>
            </div>
            <div className={styles.container}>
              <div className={styles.item}>
                <span>Step 1</span>
                <p>
                  Fill out your Naming Brief and begin receiving name ideas in
                  minutes
                </p>
              </div>
              <div className={styles.item}>
                <span>Step 2</span>
                <p>
                  Rate the submissions and provide feedback to creatives.
                  Creatives submit even more names based on your feedback.
                </p>
              </div>
              <div className={styles.item}>
                <span>Step 3</span>
                <p>
                  Our team helps you test your favorite names with your target
                  audience. We also assist with Trademark screening.
                </p>
              </div>
              <div className={styles.item}>
                <span>Step 4</span>
                <p>Pick a Winner. The winner gets paid for their submission.</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.questions}>
          <div className={styles.wrapper}>
            <h3>Frequently Asked Questions</h3>
            <div className={styles.tabs}>
              <span className={styles.active}>Launching A Contest</span>
              <span>Buying From Marketplace</span>
              <span>Managed Contests</span>
              <span>For Creatives</span>
            </div>
            <div className={styles.collection}>
              <div className={styles.content}>
                <h4>Launching A Contest</h4>
                <div>
                  <div className={styles.container}>
                    <div className={styles.item}>
                      <span>
                        How long does it take to start receiving submissions?
                      </span>
                    </div>
                    <div className={styles.item}>
                      <span>How long do Naming Contests last?</span>
                    </div>
                    <div className={styles.item}>
                      <span>Where are the creatives located?</span>
                    </div>
                    <div className={styles.item}>
                      <span>What if I do not like any submissions?</span>
                    </div>
                    <div className={styles.item}>
                      <span>How much does it cost?</span>
                    </div>
                    <div className={styles.item}>
                      <span>
                        I need both a Name and a Logo. Do you offer any discount
                        for multiple contests?
                      </span>
                    </div>
                    <div className={styles.item}>
                      <span>
                        What if I want to keep my business idea private?
                      </span>
                    </div>
                    <div className={styles.item}>
                      <span>Can you serve customers outside the US?</span>
                    </div>
                    <div className={styles.item}>
                      <span>Can I see any examples?</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.collection}>
              <div className={styles.content}>
                <h4>Buying From Marketplace</h4>
                <div>
                  <div className={styles.container}>
                    <div className={styles.item}>
                      <span>What's included with a Domain Purchase?</span>
                    </div>
                    <div className={styles.item}>
                      <span>How does the Domain transfer process work?</span>
                    </div>
                    <div className={styles.item}>
                      <span>
                        If I purchase a Domain on installments, can I start
                        using it to setup my website?
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.collection}>
              <div className={styles.content}>
                <h4>Managed Contests</h4>
                <div>
                  <div className={styles.container}>
                    <div className={styles.item}>
                      <span>What are Managed Contests?</span>
                    </div>
                    <div className={styles.item}>
                      <span>
                        What's a typical timeline for a Managed Contest?
                      </span>
                    </div>
                    <div className={styles.item}>
                      <span>How much do Managed Contests cost?</span>
                    </div>
                    <div className={styles.item}>
                      <span>Where are the Branding Consultants located?</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.collection}>
              <div className={styles.content}>
                <h4>For Creatives</h4>
                <div>
                  <div className={styles.container}>
                    <div className={styles.item}>
                      <span>Can anyone join your platform?</span>
                    </div>
                    <div className={styles.item}>
                      <span>
                        Can I start participating immediately upon signing up?
                      </span>
                    </div>
                    <div className={styles.item}>
                      <span>How Do I Get Paid?</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles['search-block']}>
          <div className={styles.wrapper}>
            <div className={styles['search-input']}>
              <div className={styles.icon}></div>
              <input placeholder='Search Over 200,000+ Premium Names' />
              <button>
                <span></span>
              </button>
            </div>
            <div className={styles['tags-list']}>
              <a>Tech</a>
              <a>Clothing</a>
              <a>Finance</a>
              <a>Real Estate</a>
              <a>Crypto</a>
              <a>Short</a>
              <a>One World</a>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.column}>
              <h3>Services</h3>
              <a>Domains for Sale</a>
              <a>Ultra Premium Marketplace</a>
              <a>Premium Domains For Sale</a>
              <a>Crowdsource Naming</a>
              <a>Brandable Domains</a>
              <a>Short Domains</a>
              <a>3 Letter Domains</a>
              <a>4 Letter Domains</a>
              <a>5 Letter Domains</a>
              <a>6 Letter Domains</a>
              <a>7 Letter Domains</a>
              <a>One Word Domains</a>
              <a>Brand Identity Design</a>
              <a>Agency Services</a>
              <a>Logo Contests</a>
              <a>Tagline Contests</a>
              <a>Trademark Filing Service</a>
              <a>Audience Test</a>
            </div>

            <div className={styles.column}>
              <h3>Tools</h3>
              <a>Business Name Generator</a>
              <a>Domain Name Generator</a>
              <a>Domain Appraisal</a>
              <a>How to Name Your Business</a>
              <a>Free Trademark Checker</a>
              <a>Branding Blog</a>
              <a>Startup Toolkit</a>
              <a>Startup Name Generator</a>
              <a>Band Name Generator</a>
              <a>Blog Name Generator</a>
              <a>Product Name Generator</a>
              <a>YouTube Name Generator</a>
              <a>Domain Extensions</a>
              <a>Build a Brand</a>
            </div>

            <div className={styles.column}>
              <h3>Sellers</h3>
              <a>Become a Seller</a>
              <a>Domain Selling Info</a>
              <a>Ultra Premium Seller Info</a>
              <a>Sapphire Marketplace</a>
              <a>Domain Auctions</a>
              <a>Discussion Forum</a>
              <h3 className={styles.inner}>Creatives</h3>
              <a>Become a Creative</a>
              <a>Creative FAQs</a>
              <a>Active Contests</a>
              <a>Recent Winners</a>
              <a>Discussion Forum</a>
            </div>
            <div className={styles.column}>
              <h3>Atom</h3>
              <a>About</a>
              <a>Contact</a>
              <a>How It Works</a>
              <a>Testimonials</a>
              <a>Our Work</a>
              <a>Help & FAQs</a>
              <a>Partner with Us</a>
              <a>Affiliate Program</a>
              <a>AtomRadar</a>
              <h3 className={styles.inner}>Legal</h3>
              <a>Terms of Service</a>
              <a>Privacy Policy</a>
              <a>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HowItWorks
