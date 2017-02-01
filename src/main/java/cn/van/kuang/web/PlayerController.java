package cn.van.kuang.web;

import cn.van.kuang.web.model.Player;
import cn.van.kuang.web.model.PlayerBuilder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PlayerController {

    @RequestMapping("/players")
    public List<Player> list() {
        List<Player> players = new ArrayList<>();

        players.add(new Player(new PlayerBuilder(1).name("Kobe Bryant").height(6.9d).position("PG").club("Lakers")));
        players.add(new Player(new PlayerBuilder(2).name("LeBron James").height(7.0d).position("SF").club("Cavaliers")));
        players.add(new Player(new PlayerBuilder(3).name("Stephen Curry").height(6.3d).position("PG").club("Warriors")));

        return players;
    }

}
