var disqus_url = embedVars.disqusUrl;
var disqus_identifier = embedVars.disqusIdentifier;
var disqus_container_id = 'disqus_thread';
var disqus_shortname = embedVars.disqusShortname;
var disqus_title = embedVars.disqusTitle;
var disqus_config_custom = window.disqus_config;
var disqus_config = function() {
    var dsqConfig = embedVars.disqusConfig;
    this.page.integration = dsqConfig.integration;
    this.page.remote_auth_s3 = dsqConfig.remote_auth_s3;
    this.page.api_key = dsqConfig.api_key;
    this.sso = dsqConfig.sso;
    this.language = dsqConfig.language;
    if (disqus_config_custom)
        disqus_config_custom.call(this)
};
var disqus_observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
        (function() {
            var d = document,
                s = d.createElement('script');
            s.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s)
        })();
        disqus_observer.disconnect()
    }
}, {
    threshold: [0]
});
disqus_observer.observe(document.querySelector("#disqus_thread"))