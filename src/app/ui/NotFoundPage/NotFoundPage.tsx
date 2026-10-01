import { Link } from 'react-router-dom'
import { Path } from '@/common/routing/paths'
import styles from './NotFoundPage.module.css'

export const NotFoundPage = () => {
  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <div className={styles.sky} aria-hidden="true">
        <span className={`${styles.star} ${styles.starOne}`} />
        <span className={`${styles.star} ${styles.starTwo}`} />
        <span className={`${styles.star} ${styles.starThree}`} />
        <span className={`${styles.star} ${styles.starFour}`} />
        <span className={`${styles.star} ${styles.starFive}`} />
        <span className={`${styles.star} ${styles.starSix}`} />
      </div>

      <div className={styles.content}>
        <div className={styles.scene} aria-hidden="true">
          <span className={styles.digit}>4</span>
          <div className={styles.moonFrame}>
            <svg className={styles.moon} viewBox="0 0 360 360" focusable="false">
              <defs>
                <radialGradient id="moon-surface" cx="32%" cy="23%" r="79%">
                  <stop offset="0%" stopColor="#fff1ba" />
                  <stop offset="48%" stopColor="#facc15" />
                  <stop offset="78%" stopColor="#dfaa43" />
                  <stop offset="100%" stopColor="#a96c35" />
                </radialGradient>
                <radialGradient id="moon-crater-floor" cx="60%" cy="65%" r="75%">
                  <stop offset="0%" stopColor="#81522f" stopOpacity="0.56" />
                  <stop offset="72%" stopColor="#a66a35" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#b47c3b" stopOpacity="0.12" />
                </radialGradient>
                <radialGradient id="moon-limb" cx="33%" cy="25%" r="76%">
                  <stop offset="60%" stopColor="#684329" stopOpacity="0" />
                  <stop offset="86%" stopColor="#684329" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#684329" stopOpacity="0.28" />
                </radialGradient>
                <clipPath id="moon-shape">
                  <circle cx="180" cy="180" r="156" />
                </clipPath>
              </defs>

              <circle cx="180" cy="180" r="165" fill="#facc15" opacity="0.12" />
              <circle cx="180" cy="180" r="156" fill="url(#moon-surface)" />
              <g clipPath="url(#moon-shape)">
                <path d="M35 114C90 29 207 14 298 62" fill="none" stroke="#fff6d5" strokeWidth="22" opacity="0.22" />
                <path d="M32 177C43 159 63 156 78 166C92 176 90 197 76 207C64 216 39 218 27 205Z" fill="#98652f" opacity="0.14" />
                <path d="M246 44C270 46 296 62 305 83C309 101 298 116 279 114C257 111 242 95 231 80C222 66 229 48 246 44Z" fill="#926037" opacity="0.17" />
                <path d="M273 174C295 160 320 172 335 194L341 245C324 258 307 244 285 244C268 241 257 216 263 198Z" fill="#885b36" opacity="0.14" />
                <path d="M70 281C91 267 114 271 134 284C155 297 177 293 197 287C217 283 246 292 253 313C241 335 197 344 162 339C118 338 86 324 70 302Z" fill="#916037" opacity="0.13" />
                <path d="M83 106C112 93 141 100 157 113C160 119 155 124 148 124C127 109 111 115 91 123Z" fill="#9a6737" opacity="0.1" />

                <path d="M54 75C59 57 81 51 98 59C116 65 124 84 115 100C107 116 83 122 65 112C48 103 45 90 54 75Z" fill="#ffe5a0" opacity="0.68" />
                <path d="M61 76C69 62 85 60 99 67C111 75 114 90 104 101C95 111 76 111 65 102C55 94 55 84 61 76Z" fill="url(#moon-crater-floor)" stroke="#9d6736" strokeWidth="2.5" strokeOpacity="0.48" />
                <path d="M56 79C63 59 88 52 105 66" fill="none" stroke="#fff2c1" strokeWidth="6" strokeLinecap="round" opacity="0.7" />

                <path d="M252 76C263 63 286 62 300 73C314 83 314 102 300 113C289 123 269 123 256 113C243 102 242 89 252 76Z" fill="#ffe4a0" opacity="0.45" />
                <path d="M258 81C269 69 286 71 297 80C306 89 305 102 294 110C281 118 265 113 257 104C250 96 252 88 258 81Z" fill="url(#moon-crater-floor)" stroke="#875a32" strokeWidth="2.5" strokeOpacity="0.43" />
                <path d="M250 83C260 65 285 64 301 76" fill="none" stroke="#fff1b8" strokeWidth="5" strokeLinecap="round" opacity="0.57" />

                <path d="M36 183C45 170 65 169 78 180C88 189 87 207 76 218C62 231 38 225 29 211Z" fill="#f8dc89" opacity="0.51" />
                <path d="M41 185C51 176 66 178 76 187C83 197 77 211 66 217C54 222 40 214 37 203C35 196 37 190 41 185Z" fill="url(#moon-crater-floor)" stroke="#8f6036" strokeWidth="2.5" strokeOpacity="0.55" />
                <path d="M33 190C41 171 63 171 78 181" fill="none" stroke="#fff0b6" strokeWidth="5" strokeLinecap="round" opacity="0.52" />

                <path d="M287 184C301 173 319 179 326 195C334 211 327 228 311 236C294 242 277 231 274 214C271 202 277 191 287 184Z" fill="#f8db8d" opacity="0.48" />
                <path d="M289 190C302 183 316 189 321 201C325 215 318 227 305 230C291 232 281 223 280 211C279 202 282 195 289 190Z" fill="url(#moon-crater-floor)" stroke="#865630" strokeWidth="2.5" strokeOpacity="0.5" />
                <path d="M282 190C296 177 313 181 324 194" fill="none" stroke="#ffecad" strokeWidth="5" strokeLinecap="round" opacity="0.48" />

                <path d="M76 278C89 265 111 267 122 280C133 292 131 309 116 319C101 329 80 322 72 307C67 297 69 286 76 278Z" fill="#ffdda0" opacity="0.51" />
                <path d="M80 284C91 274 108 276 117 287C124 298 119 311 108 316C95 322 80 313 76 302C74 295 76 288 80 284Z" fill="url(#moon-crater-floor)" stroke="#8c5a34" strokeWidth="2.5" strokeOpacity="0.46" />
                <path d="M72 286C82 269 107 267 120 280" fill="none" stroke="#fff0be" strokeWidth="5" strokeLinecap="round" opacity="0.52" />

                <path d="M209 301C223 291 243 296 252 308C262 323 252 340 234 344C215 347 201 337 200 320C199 312 203 306 209 301Z" fill="#ffdf9b" opacity="0.43" />
                <path d="M213 306C225 298 240 302 247 313C254 325 245 337 231 339C216 340 206 331 206 320C206 314 208 309 213 306Z" fill="url(#moon-crater-floor)" stroke="#895932" strokeWidth="2.5" strokeOpacity="0.46" />
                <path d="M205 309C215 296 239 295 251 309" fill="none" stroke="#fff0bc" strokeWidth="5" strokeLinecap="round" opacity="0.48" />

                <path d="M168 69C173 62 184 61 191 67C199 74 197 84 190 89C182 94 172 90 167 83C164 78 164 73 168 69Z" fill="url(#moon-crater-floor)" stroke="#fff0b8" strokeWidth="3" strokeOpacity="0.58" />
                <path d="M249 269C255 264 263 265 267 271C271 277 268 284 262 287C255 289 248 285 246 279C245 275 246 272 249 269Z" fill="url(#moon-crater-floor)" stroke="#ffebad" strokeWidth="2.5" strokeOpacity="0.55" />
                <path d="M136 301C141 295 150 296 154 302C158 309 154 316 147 318C139 319 133 314 133 307C133 305 134 303 136 301Z" fill="url(#moon-crater-floor)" stroke="#ffefb7" strokeWidth="2.5" strokeOpacity="0.5" />
                <path d="M307 139C312 135 320 136 323 142C327 148 323 155 317 157C310 158 304 154 303 147C303 144 304 141 307 139Z" fill="url(#moon-crater-floor)" stroke="#ffebb1" strokeWidth="2.5" strokeOpacity="0.49" />
                <path d="M39 137C44 132 51 132 56 137C60 142 58 150 52 153C46 156 38 151 37 145C36 142 37 139 39 137Z" fill="url(#moon-crater-floor)" stroke="#fff0b9" strokeWidth="2.5" strokeOpacity="0.48" />

                <path d="M56 244C83 229 105 239 120 258M245 274C270 254 305 254 327 270M140 59C174 45 209 48 234 61" fill="none" stroke="#865b36" strokeWidth="3" strokeLinecap="round" opacity="0.16" />
                <path d="M70 239C93 230 109 242 118 253M251 276C276 262 303 260 321 272" fill="none" stroke="#fff1b8" strokeWidth="2.5" strokeLinecap="round" opacity="0.24" />
                <path d="M41 227C78 272 110 300 162 313" fill="none" stroke="#a96c3a" strokeWidth="6" opacity="0.17" />
                <path d="M264 57C291 75 314 106 325 138" fill="none" stroke="#fff5ca" strokeWidth="7" opacity="0.28" />
                <circle cx="180" cy="180" r="156" fill="url(#moon-limb)" />

                <path className={styles.browLeft} d="M89 135Q119 116 151 132" fill="none" stroke="#684b35" strokeWidth="8" strokeLinecap="round" />
                <path className={styles.browRight} d="M207 129Q239 114 273 132" fill="none" stroke="#684b35" strokeWidth="8" strokeLinecap="round" />

                <g className={styles.eyeLeft}>
                  <path d="M93 163Q122 139 155 160Q126 182 93 163Z" fill="#fff7d6" stroke="#684b35" strokeWidth="4" />
                  <circle className={styles.pupil} cx="128" cy="162" r="10" fill="#3f352e" />
                  <path d="M92 158Q123 139 157 158" fill="none" stroke="#684b35" strokeWidth="5" strokeLinecap="round" />
                </g>
                <g className={styles.eyeRight}>
                  <path d="M209 159Q240 138 270 160Q239 181 209 159Z" fill="#fff7d6" stroke="#684b35" strokeWidth="4" />
                  <circle className={styles.pupil} cx="238" cy="161" r="10" fill="#3f352e" />
                  <path d="M207 156Q240 139 271 157" fill="none" stroke="#684b35" strokeWidth="5" strokeLinecap="round" />
                </g>

                <path d="M176 153C170 175 169 193 177 207C185 220 209 213 211 201" fill="none" stroke="#80583c" strokeWidth="6" strokeLinecap="round" />
                <path d="M113 202Q125 208 139 202M229 200Q245 207 258 200" fill="none" stroke="#a16941" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
                <path className={styles.mouth} d="M137 247Q178 226 225 247Q183 277 137 247Z" fill="#754436" stroke="#704b38" strokeWidth="4" strokeLinejoin="round" />
                <path d="M149 247Q183 253 214 246" fill="none" stroke="#f5d78c" strokeWidth="3" strokeLinecap="round" />
                <path d="M127 254Q135 264 145 264M221 264Q232 264 238 253" fill="none" stroke="#9b653d" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              </g>
              <circle cx="180" cy="180" r="155" fill="none" stroke="#fff3c2" strokeWidth="3" opacity="0.55" />
            </svg>
          </div>
          <span className={styles.digit}>4</span>
        </div>

        <p className={styles.eyebrow}>ERROR 404</p>
        <h1 className={styles.title} id="not-found-title">Not Found</h1>
        <Link className={styles.homeLink} to={Path.Main}>Back to Home</Link>
      </div>
    </section>
  )
}
